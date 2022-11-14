/****************************************************************************************************************************
Save and Load loadData
*****************************************************************************************************************************/
var MyPlatform = "Web";
var CURRENT_FILE_OBJ = {};
var CURRENT_FILE_ID = "";
var CURRENT_FILE_NAME = "";
var SHOW_CREATE = false;

$(document).on("click", "#exportWord", function () {
  exportHTML($("#outputHTML").html());
});

function exportHTML(myHtml) {
  var header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Wavemaker Document</title></head><body>";
  var footer = "</body></html>";
  var sourceHTML = header + myHtml + footer;

  var source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = CURRENT_FILE_NAME + "exported-wmproj.doc";
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

$(function () {
  var browserRef = window.location.href;

  if (IsElectron) {
    // check done in HTML main file
    MyPlatform = "Electron";
  }

  if (window.chrome && chrome.app && chrome.app.runtime) {
    MyPlatform = "ChromeOS";
  } else {
    if (
      browserRef.indexOf("localhost:3000") ||
      browserRef.indexOf("wavemaker.co.uk")
    ) {
      //web app so use google drive
      include("https://apis.google.com/js/api.js");
      include("js/googledrive.js");
    } else {
      //console.log("Electron App")
      MyPlatform = "Electron";
    }
  }

  $("#newProject").click(function () {
    if (MyPlatform !== "ChromeOS") {
      CURRENT_FILE_OBJ = {};
      CURRENT_FILE_ID = "";
    }

    if ($("#projectTemplate").val() == "") {
      WaveMaker = {};
      WaveMaker.writer = {};
      WaveMaker.settings = {};
      WaveMaker.settings.theme = "default";
      EditorInit();
    } else {
      $.getJSON("templates/" + $("#projectTemplate").val() + ".json", function (
        data
      ) {
        WaveMaker = data;
        EditorInit();
      });
    }
  });

  $("#chooseFileButton").click(function () {
    if (MyPlatform !== "ChromeOS") {
      CURRENT_FILE_OBJ = {};
      CURRENT_FILE_ID = "";
      SHOW_CREATE = false;
    }
    loadData();
  });
});

function saveData() {
  if (MyPlatform === "ChromeOS") {
    saveDataChrome();
  }
  if (MyPlatform === "Electron") {
    saveDataElectron();
  }
  if (MyPlatform === "Web") {
    saveDataGdrive();
  }
}

function loadData() {
  if (MyPlatform === "ChromeOS") {
    loadDataChrome();
  }

  if (MyPlatform === "Electron") {
    electronLoad();
  }
  if (MyPlatform === "Web") {
    loadDataGdrive();
  }
}

function writeHTMLoutput(opt_blob) {
  if (MyPlatform === "ChromeOS") {
    writeHTMLoutputChrome(opt_blob);
  }

  if (MyPlatform === "Electron") {
    writeHTMLoutputElectron(opt_blob);
  }
  if (MyPlatform === "Web") {
    writeHTMLoutputGoogleDrive(opt_blob);
  }
}

function saveDataChrome() {
  $("#saveAlert").show();
  myname = "My new Novel.wmProj";

  if (chosenFileEntry) {
    myname = chosenFileEntry.name;
    var blob = new Blob([JSON.stringify(WaveMaker, null, 2)], {
      type: "text/json"
    });
    writeFileEntry(chosenFileEntry, blob, function (e) {
      $("#saveAlert").fadeOut();
      autosaveTrigger = true;
    });
  } else {
    var accepts = [
      {
        extensions: ["wmProj"]
      }
    ];
    var config = {
      type: "saveFile",
      suggestedName: myname,
      accepts: accepts
    };
    chrome.fileSystem.chooseEntry(config, function (writableEntry) {
      if (chrome.runtime.lastError) {
        $("#saveAlert").fadeOut();
        autosaveTrigger = true;
      } else {
        var blob = new Blob([JSON.stringify(WaveMaker, null, 2)], {
          type: "text/json"
        });
        chosenFileEntry = writableEntry;
        writeFileEntry(writableEntry, blob, function (e) {
          $("#saveAlert").fadeOut();
          autosaveTrigger = true;
        });
      }
    });
  }
}

function loadDataChrome() {
  $("#fileError").html('<div class="alert alert-info"><i class="fa fa-spinner fa-spin"></i> Please Wait ... loading file</div>');
  var accepts = [
    {
      extensions: ["wmProj"]
    }
  ];
  chrome.fileSystem.chooseEntry(
    {
      type: "openFile",
      accepts: accepts
    },
    function (theEntry) {
      if (!theEntry) {
        $("#fileError").html('');
        return;
      }
      chosenFileEntry = theEntry;
      theEntry.file(function (file) {
        var reader = new FileReader();
        reader.onerror = function () { };
        reader.onloadend = function (e) {
          if (IsJsonString(e.target.result)) {
            WaveMaker = JSON.parse(e.target.result);
            $("#fileError").html('');
            autosaveTrigger = true;
            EditorInit();
          } else {
            console.log("Trying to fix error in the file");
            fixfile(e.target.result);
          }

        };
        reader.readAsText(file);
      });
    }
  );
}

function fixfile(fixer) {
  // trying to remove chars from the string till we get a valid response
  for (i = fixer.length; i > 0; --i) {
    fixer = fixer.slice(0, -1)
    console.log("fx : " + i)
    if (IsJsonString(fixer)) {
      WaveMaker = JSON.parse(fixer);
      autosaveTrigger = true;
      EditorInit();
      break;
    }
  }
  console.log("Got through whole file and failed!")
  $("#fileError").html(`<div class='alert alert-warning'>
  <h2>File Broken</h2>
  <p>This file is badly broken or is not a valid Wavemaker file!</p>
  <p>Try contacting us and send a copy of the file to cards@wavemaker.co.uk</p>
</div>`);
}


function writeFileEntry(writableEntry, opt_blob, callback) {
  if (!writableEntry) {
    return;
  }

  writableEntry.createWriter(
    function (writer) {
      var newsize;
      writer.onerror = function () { };
      writer.onwriteend = function (e) {
        if (writingBlocker == 1) {
          e.currentTarget.truncate(newsize);
          writingBlocker = 0;
        }

        $("#saveAlert").fadeOut();
        autosaveTrigger = true;
      };
      newsize = opt_blob.size;
      writer.seek(0);
      writer.write(opt_blob);
    },
    function () { }
  );
}

function writeHTMLoutputChrome(opt_blob) {
  var newsize;
  writingBlocker = 1;
  myname = "My Novel.txt";
  var accepts = [
    {
      extensions: ["txt"]
    }
  ];
  var config = {
    type: "saveFile",
    suggestedName: myname,
    accepts: accepts
  };
  chrome.fileSystem.chooseEntry(config, function (writableEntry) {
    if (chrome.runtime.lastError) {
      swal(
        "File Not Saved!",
        "You probably cancelled the save dialogue window without selecting a file.",
        "info"
      );
    } else {
      var blob = new Blob([opt_blob], {
        type: "text/text"
      });

      writableEntry.createWriter(function (writer) {
        writer.onerror = function () {
          swal("File Error", "There was a problem saving!", "error");
        };
        writer.onwriteend = function (e) {
          if (writingBlocker == 1) {
            e.currentTarget.truncate(newsize);
            writingBlocker = 0;

            swal("File Saved", "The file has been saved!", "success");
          }
        };

        writer.seek(0);
        writer.write(blob);
      });
    }
  });
}

/***************************************************************************************************************
Electron file functions
***************************************************************************************************************/

function electronLoad() {
  //console.log("Loading")
  const { dialog } = require("electron").remote;
  fs = require("fs");
  dialog.showOpenDialog(
    {
      filters: [
        {
          name: "Wavemaker Project",
          extensions: ["wmProj"]
        }
      ]
    },
    fileNames => {
      // fileNames is an array that contains all the selected
      if (fileNames === undefined) {
        console.log("No file selected");
        return;
      } else {
        console.log(fileNames);
        CURRENT_FILE_NAME = fileNames[0];
      }

      fs.readFile(CURRENT_FILE_NAME, "utf-8", (err, data) => {
        if (err) {
          swal(
            "File Error",
            "There was a problem saving! " + err.message,
            "error"
          );
          return;
        }
        WaveMaker = JSON.parse(data);
        autosaveTrigger = true;
        EditorInit();
        // Change how to handle the file content
        //console.log("The file content is : " + data);
      });
    }
  );
}

function saveDataElectron() {
  $("#saveAlert").show();
  console.log("save Triggered");
  let content = JSON.stringify(WaveMaker, null, 2);
  const { dialog } = require("electron").remote;
  fs = require("fs");
  // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)

  if (CURRENT_FILE_NAME === "") {
    dialog.showSaveDialog(
      {
        filters: [
          {
            name: "Wavemaker Project",
            extensions: ["wmProj"]
          }
        ]
      },

      fileName => {
        if (fileName === undefined) {
          console.log("You didn't save the file");
          $("#saveAlert").fadeOut();
          swal(
            "File Not Saved!",
            "You probably cancelled the save dialogue window without selecting a file.",
            "info"
          );
          return;
        }

        // fileName is a string that contains the path and filename created in the save file dialog.
        fs.writeFile(fileName, content, err => {
          if (err) {
            $("#saveAlert").fadeOut();
            alert("An error ocurred creating the file " + err.message);
          }
          CURRENT_FILE_NAME = fileName;
          $("#saveAlert").fadeOut();
          autosaveTrigger = true;
          console.log("The file has been succesfully saved");
        });
      }
    );
  } else {
    // fileName is a string that contains the path and filename created in the save file dialog.
    fs.writeFile(CURRENT_FILE_NAME, content, err => {
      if (err) {
        $("#saveAlert").fadeOut();
        alert("An error ocurred creating the file " + err.message);
      }
      $("#saveAlert").fadeOut();
      autosaveTrigger = true;
      console.log("The file has been succesfully saved");
    });
  }
}

function writeHTMLoutputElectron(content) {
  const { dialog } = require("electron").remote;
  fs = require("fs");
  dialog.showSaveDialog(
    {
      filters: [
        {
          name: "Text",
          extensions: ["txt"]
        }
      ]
    },
    fileName => {
      if (fileName === undefined) {
        $("#saveAlert").fadeOut();
        console.log("You didn't save the file");
        return;
      }

      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(fileName, content, err => {
        if (err) {
          $("#saveAlert").fadeOut();
          alert("An error ocurred creating the file " + err.message);
        }
        $("#saveAlert").fadeOut();
        autosaveTrigger = true;
        swal("File Saved!", "Your text file has been saved!", "success");
        console.log("The file has been succesfully saved");
      });
    }
  );
}


function IsJsonString(str) {
  try {
    var json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}
