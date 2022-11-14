var WaveMaker = {};
var showerrors = true;
var FrameSetInstance;
var currentitem;
var selectedCard = false;
var selectedSection = false;
var chosenFileEntry = null;
var showcompletedcards = true;
var writingBlocker = 1;
var cardToolsave = false;

var autosaveTrigger = false;
var lastkeydown = null;
var IsElectron = false;
if (IsElectron) {
  if (typeof module === "object") {
    window.module = module;
    module = undefined;
  }
}

Object.size = function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

function timerFunctions() {
  //console.log("Timer Triggered")
  if (lastkeydown && ((Date.now() / 1000) | 0) - lastkeydown > 1) {
    // if its more than 2 seconds from the last keydown
    // only save after amends have been made
    lastkeydown = false;

    if (autosaveTrigger) {
      autosaveTrigger = false;
      if (MyPlatform == "ChromeOS") {
        //console.log(chosenFileEntry);
        if (chosenFileEntry) {
          //console.log("File Exists")
          //console.log("trigger Save");
          saveData();
        }
      } else {
        //console.log(CURRENT_FILE_NAME);
        if (CURRENT_FILE_NAME) {
          //console.log("File Exists")
          //console.log("trigger Save");
          saveData();
        }
      }
    }
  }
  // set next timer trigger
  setTimeout(timerFunctions, 1000);
}

$(function() {
  $(document).on("click", "#setfonts", function() {
    bodyfont = $("#bodyfont").val();
    editfont = $("#editorfont").val();
    fontSize = $("#fontsize").val();
    $("body").attr(
      "style",
      "--bodyFont:" +
        bodyfont +
        ";--editorFont:" +
        editfont +
        ";--fontSize:" +
        fontSize +
        ";"
    );
  });

  setTimeout(timerFunctions, 1000);
  if (window.chrome && chrome.app && chrome.app.runtime) {
    $("#supportlink").show();
  }

  $(window)
    .unbind()
    .bind("keydown", function(event) {
      lastkeydown = (Date.now() / 1000) | 0;

      if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
          case "s":
            event.preventDefault();
            writingBlocker = 1;
            saveData();
            break;
          case "f":
            event.preventDefault();

            break;
          case "g":
            event.preventDefault();
            break;
          case "e":
            exportBook();
            break;
          case "q":
            showerrors = !showerrors;
            if (showerrors) {
            } else {
            }
            break;
        }
      }
    });

  $("#defaulttheme")
    .unbind()
    .click(function() {
      switchTheme("default");
    });

  $("#darktheme")
    .unbind()
    .click(function() {
      switchTheme("dark");
    });
  $("#lighttheme")
    .unbind()
    .click(function() {
      switchTheme("light");
    });
  $("#sunshinetheme")
    .unbind()
    .click(function() {
      switchTheme("sunshine");
    });
  $("#royaltheme")
    .unbind()
    .click(function() {
      switchTheme("royal");
    });

  $("#saveCard")
    .unbind()
    .click(function() {
      saveCard();
    });
});

function switchTheme(theme) {
  $('link[rel=stylesheet][href~="themes"]').remove();
  $("head link[rel='stylesheet']")
    .last()
    .after(
      "<link rel='stylesheet' href='themes/" + theme + ".css' type='text/css'>"
    );
  WaveMaker.settings.theme = theme;
}

function EditorInit() {
  $(".popover").popover("hide");
  cardToolsave = false;
  /* THEME settings*/
  //Set UP theme

  if (!WaveMaker.settings) {
    /*
        THIS is a fix so old files will still work and will need to
        be removed when I have alterd all of the templates, but can stay for now
        */

    writerFix = WaveMaker;
    WaveMaker = {};
    WaveMaker.writer = writerFix;

    WaveMaker.settings = {};
    WaveMaker.settings.theme = "default";

    swal(
      "Updated File",
      "Hi. We've made some changes to the system, this means we've had to alter the file format a bit.<Br> Don't worry we've converted your old file :)",
      "success"
    );
  }

  switchTheme(WaveMaker.settings.theme);

  $("#app").load("html/framework.html", function() {
    FrameSetInstance = Split(["#lhs_frame", "#center_frame", "#rhs_frame"], {
      gutterSize: 8,
      cursor: "col-resize",
      minSize: [320, 100, 320],
      sizes: [20, 60, 20]
    });

    $("#lhs").load("html/lhs.html", function() {
      $("#main").load("html/editorwindow.html", function() {
        toggleEditor(false);
        setupLeftHandSide();
        navButtons(1);
        autosize($(".texteditor"));
        $("#loadingScreen").hide();
      });
    });
  });
}

function navButtons(bingo) {
  $("#navsystem").html("");

  $("#navsystem").append(
    '<button type="button" id="mainnav" class="navbtn"><svg class="logo" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 235 234.3"><g id="Layer_x0020_1">    <g id="_921457168"><path class="logo-top" d="M194.1 65.8L135.8 7.5c-10.1-10.1-26.5-10.1-36.6 0L41.1 65.7c-3.4 3.4-3.4 8.8 0 12.2l17.6 17.6 11.7 10.9c3.5 3.2 8.8 3.2 12.3 0l23.5-21.7c6.5-6 16.4-6 22.8 0l23.5 21.7c3.5 3.2 8.8 3.2 12.3 0l11.7-10.9L194.1 78c3.3-3.3 3.3-8.8 0-12.2z" />    <path class="logo-bottom" d="M7.9 135.5l91.3 91.3c10.1 10.1 26.5 10.1 36.6 0l91.3-91.3c15.8-15.8 4.7-20.5-6.9-31.5l-14.3-13.6c-3.4-3.3-8.8-3.2-12.3 0l-23.5 21.7c-6.5 6-16.4 6-22.8 0l-23.5-21.7a9.08 9.08 0 0 0-12.3 0L88 112.1c-6.5 6-16.4 6-22.8 0L41.7 90.4a9.08 9.08 0 0 0-12.3 0l-13.2 12.2c-12.1 11.2-24.8 16.3-8.3 32.9z" />    </g>  </g></svg></button>'
  );

  $("#navsystem").append(
    '<button type="button" id="lhs-hide" class="navbtn"><i class="fa fa-caret-square-o-left"></i></button>'
  );
  $("#navsystem").append(
    '<button type="button" id="panels-show" class="navbtn"><i class="fa fa-caret-square-o-up"></i></button>'
  );
  $("#navsystem").append(
    '<button type="button" id="rhs-hide" class="navbtn"><i class="fa fa-caret-square-o-right"></i></button>'
  );

  $("#navsystem").append(
    '<button type="button" id="editorButton" class="navbtn"><i class="fa fa-pencil-square-o"></i><span class="d-none d-sm-inline"> Editor</span></button>'
  );
  $("#navsystem").append(
    '<button type="button" id="snowflakebutton" class="navbtn"><i class="fa fa-snowflake-o"></i><span class="d-none d-sm-inline"> Snowflake</span></button>'
  );
  $("#navsystem").append(
    '<button type="button" id="cardmanagerbutton" class="navbtn"><i class="fa fa-vcard-o"></i><span class="d-none d-sm-inline"> Cards</span></button>'
  );
  $("#navsystem").append(
    '<button type="button" id="timelineButton" class="navbtn"><i class="fa fa-calendar-o"></i><span class="d-none d-sm-inline"> Timeline</span></button>'
  );

  $("#navsystem").append(
    '<button type="button" id="panel-settings" class="navbtn"><i class="fa fa-cog"></i><span class="d-none d-sm-inline"> Settings</span></button>'
  );
  $("#navsystem").append(
    '<button type="button" id="saveButton" class="navbtn"><i class="fa fa-save"></i><span class="d-none d-sm-inline"> Save</span></button>'
  );
  $("#navsystem").append(
    '<button type="button" id="exportButton" class="navbtn"><i class="fa fa-file-text-o"></i><span class="d-none d-sm-inline"> Export</span></button>'
  );

  $("#lhs-hide")
    .unbind()
    .click(function() {
      FrameSetInstance.collapse(0);
    });
  $("#rhs-hide")
    .unbind()
    .click(function() {
      FrameSetInstance.collapse(2);
    });
  $("#panels-show")
    .unbind()
    .click(function() {
      FrameSetInstance.setSizes([25, 50, 25]);
    });

  // Save Button
  $("#saveButton")
    .unbind()
    .click(function() {
      writingBlocker = 1;
      saveData();
    });

  $("#exportButton")
    .unbind()
    .click(function() {
      exportBook();
    });
  $("#editorButton")
    .unbind()
    .click(function() {
      EditorInit();
    });

  $("#timelineButton")
    .unbind()
    .click(function() {
      setupTimeline();
    });
  $("#snowflakebutton")
    .unbind()
    .click(function() {
      setupSnowflake();
    });

  $("#cardmanagerbutton")
    .unbind()
    .click(function() {
      setupCardmanager();
    });

  $("#panel-settings")
    .unbind()
    .click(function() {
      $("#SettingsModal").modal("show");
    });

  $("#mainnav")
    .unbind()
    .click(function() {
      swal({
        title: "Are you sure?",
        text: "Any changes you have not saved will be lost!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ok I've saved!"
      }).then(result => {
        if (result.value) {
          // this needs to reset the whole thing
          WaveMaker = {};
          currentitem = null;
          selectedCard = false;
          chosenFileEntry = null;
          // added to prevent overwriting from autosave on quit
          autosaveTrigger = false;
          lastkeydown = null;
          CURRENT_FILE_NAME = "";
          $("#app").html("");
          $("#wordcount").hide("");
          $("#navsystem").html("");
          $("#loadingScreen").show();
        }
      });
    });
}

function setupLeftHandSide() {
  $("#chapterNav").html("");
  WaveMaker.writer = sortAndReturn(WaveMaker.writer);
  $.each(WaveMaker.writer, function(key, value) {
    myText = "-----------";
    if (value.title != "") {
      myText = value.title;
    }
    myIcon = "fa-square-o";
    if (value.active == 1) {
      myIcon = "fa-square";
      selectedSection = key;
      showActiveSection(key);
    }
    $("#chapterNav").append(
      '<li id="' +
        key +
        '" class="sectionNav"><i class="fa ' +
        myIcon +
        ' fa-fw"></i>  <span >' +
        myText +
        '</span><button type="button" class="pull-right btn btn-danger btn-circle btn-xs deleteButton"><i class="fa fa-times" title="Delete this Section"></i></button></li>'
    );
  });

  $("#chapterNav").sortable({
    axis: "y",
    update: function() {
      repositionData();
    }
  });

  $("#chapterNav").disableSelection();

  $(".sectionNav")
    .unbind()
    .click(function() {
      $(".fa-square")
        .removeClass("fa-square")
        .addClass("fa-square-o");
      $(this)
        .find(".fa-square-o")
        .removeClass("fa-square-o")
        .addClass("fa-square");
      toggleEditor(1);
      selectedSection = $(this).attr("id");
      showBlock($(this).attr("id"));
    });

  $(".deleteButton")
    .unbind()
    .click(function(evt) {
      evt.stopPropagation();
      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete it!"
      }).then(result => {
        if (result.value) {
          kill = $(this)
            .parent()
            .attr("id");

          toggleEditor(false);
          delete WaveMaker.writer[kill];
          $("#" + kill).remove();
          repositionData();
          setupLeftHandSide();

          swal("Deleted!", "Your file has been deleted.", "success");
        }
      });
    });

  $(".sectionTitle").on("keyup", function() {
    $("#" + currentitem)
      .find("span")
      .text($(this).val());
    WaveMaker.writer[currentitem].title = $(this).val();
  });

  $(".sectionText").on("change keyup paste cut", function() {
    WaveMaker.writer[currentitem].bodytext = $(this).val();
    getwordcount($(this));
  });

  // add Chapter button
  $("#addChapter")
    .unbind()
    .click(function() {
      addEditorSection();
      setupLeftHandSide();
    });
}

function addEditorSection() {
  timestamp = new Date().getTime() + "" + new Date().getUTCMilliseconds();
  WaveMaker.writer["C" + timestamp] = {
    title: "",
    bodytext: "",
    cards: {},
    active: 0,
    position: Object.size(WaveMaker.writer)
  };
}

function setupRightHandSide() {
  $("#rhs").load("html/rhs.html", function() {
    WaveMaker.writer[currentitem].cards = sortAndReturn(
      WaveMaker.writer[currentitem].cards
    );
    currentCards = WaveMaker.writer[currentitem].cards;

    $.each(currentCards, function(key, value) {
      addStyle = "";
   
      if (value.completed) {
        addStyle=addStyle+" markAsDone " ;
    }
    if(value.cardColor){
            addStyle=addStyle+" color"+value.cardColor+" " ;
    }

      $("#cardList").append(
        '<li>     <div class="wmcard cardSelect ' +
          addStyle +
          '" id="' +
          key +
          '"  data-parent="' +
          currentitem +
          '" >  <button type="button" class="pull-right btn btn-danger btn-circle btn-xs deleteCard"><i class="fa fa-times" title="Delete this Section"></i></button>        <div class="wmcard-body">          <div class="wmcard-title">' +
          value.cardtype +
          '</div>          <p class="wmcard-text">' +
          nl2br(value.cardtext) +
          '</p>        </div>          <button class="smallButtons cardEdit" ><i class="fa fa-edit"></i></button>          <button class="smallButtons cardToggle pull-right" title="Toggle Card Off" ><i class="fa fa-check"></i></button>      </div>    </li>'
      );
    });

    $("#cardList").sortable({
      axis: "y",
      update: function() {
        repositionCards();
      }
    });
    $("#cardList").disableSelection();
    CardManagerButtonsInit();
  });
}

function showActiveSection(showSection) {
  currentitem = showSection;
  $("#title").val(WaveMaker.writer[showSection].title);
  $("#bodytext").val(WaveMaker.writer[showSection].bodytext);
  getwordcount($("#bodyText"));
  $("#EditorContainer").show();
  $("#WavemakerHolder").hide();
  setupRightHandSide();
  autosize.update($(".texteditor"));
}

function showBlock(showSection) {
  // unset all the active tags in the Object
  $.each(WaveMaker.writer, function(key, value) {
    WaveMaker.writer[key].active = 0;
  });
  WaveMaker.writer[showSection].active = 1;
  currentitem = showSection;
  $("#title").val(WaveMaker.writer[showSection].title);
  $("#bodytext").val(WaveMaker.writer[showSection].bodytext);
  getwordcount($("#bodyText"));
  setupLeftHandSide();
  setupRightHandSide();
  autosize.update($(".texteditor"));
}

function repositionData() {
  counter = 0;
  $("#chapterNav>li").each(function() {
    WaveMaker.writer[$(this).attr("id")].position = counter;
    counter++;
  });
  WaveMaker.writer = sortAndReturn(WaveMaker.writer);
}

function repositionCards() {
  counter = 0;

  $("#cardList>li>.wmcard").each(function() {
    WaveMaker.writer[currentitem].cards[$(this).attr("id")].position = counter;
    counter++;
  });
  //update the list after change
  WaveMaker.writer[currentitem].cards = sortAndReturn(
    WaveMaker.writer[currentitem].cards
  );
}

function getwordcount(el) {
  var val = $.trim(el.val());
  if (val === "") {
    words = 0;
  } else {
    words = val.replace(/\s+/gi, " ").split(" ").length;
    chars = val.length;
  }
  $("#displayCount").text(words);
}

function toggleEditor(show) {
  if (show) {
    $("#EditorContainer").show();
    $("#WavemakerHolder").hide();
    setupRightHandSide();
  } else {
    $("#EditorContainer").hide();
    $("#WavemakerHolder").show();
    $("#rhs").html("");
  }
}

function nl2br(str, is_xhtml) {
  var breakTag =
    is_xhtml || typeof is_xhtml === "undefined" ? "<br />" : "<br>";
  return (str + "").replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    "$1" + breakTag + "$2"
  );
}

function exportBook() {
  var output = [];
  $.each(WaveMaker.writer, function(key, value) {
    if (key !== "tools") {
      output[value.position] = value;
    }
  });

  var outputHTML = "";
  var outputPlain = "";

  $.each(output, function(key, value) {
    outputHTML = outputHTML + "<h1>" + nl2br(value.title) + "</h1>";
    outputHTML = outputHTML + "<p>" + nl2br(value.bodytext) + "</p>";
    outputHTML = outputHTML + "<hr>";

    outputPlain = outputPlain + value.title + "\n";
    outputPlain = outputPlain + value.bodytext + "\n";
  });
  $("#outputHTML").html(outputHTML);
  $("#outputWindow").show();

  $("#hideOutput")
    .unbind()
    .click(function() {
      $("#outputWindow").hide();
    });

  $("#exportOutput")
    .unbind()
    .click(function() {
      writeHTMLoutput(outputPlain);
      swal("File Saved!", "Your text file has been saved!", "success");
      $("#outputWindow").hide();
    });
}
var doczoom = 100;

$(document).keydown(function(e) {
  // up/down arrow and ctrl
  if (e.keyCode == 38 && e.ctrlKey) {
    doczoom = doczoom + 10;
    $("body").css("zoom", doczoom + "%"); /* Webkit browsers */
  }
  if (e.keyCode == 40 && e.ctrlKey) {
    doczoom = doczoom - 10;
    $("body").css("zoom", doczoom + "%"); /* Webkit browsers */
  }
});

function include(filename) {
  var head = document.getElementsByTagName("head")[0];

  var script = document.createElement("script");
  script.src = filename;
  script.type = "text/javascript";

  head.appendChild(script);
}

function sortAndReturn(obj) {
  // the object requires a position element
  newObj = {};
  sorter = [];

  $.each(obj, function(k, v) {
    sorter[obj[k].position] = [k, v];
  });

  $.each(sorter, function(i, o) {
    newObj[o[0]] = o[1];
  });
  return newObj;
}
