
// Client ID and API key from the Developer Console
var CLIENT_ID = '196875539919-18arpm8l3es472u2pjpf1vi8qgj3rdtl.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAuG0KiJEMyzQYEj6jFiWD476y6QxQY5V0';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive.file';
var pickerApiLoaded = false;
var oauthToken
var CurrentSelectedFile

function GoogleDrivehandleClientLoad() {
    gapi.load('client:auth2', GoogleDriveInit);
}

function GoogleDriveInit() {
      $("#saveAlert").fadeOut();

    $("#GoogleDrivebuttons").hide();
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {

        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(GoogleSigninStatus);
        // Handle the initial sign-in state.
        GoogleSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

        $('#authorize-button').unbind().click(function() {
            gapi.auth2.getAuthInstance().signIn()
        });
        $('#signout-button').unbind().click(function() {
            gapi.auth2.getAuthInstance().signOut();
        });
    });
}
/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function GoogleSigninStatus(isSignedIn) {
    if (isSignedIn) {
        $('#authorize-button').hide();
        $('#signout-button').show();

        if(SHOW_CREATE){
            $("#GoogleDriveFilesList").hide()
            $("#GoogleDriveCreateForm").show();
        }
        GoogleDriveHideFiles();
        GoogleDriveListFiles();
        $("#GoogleDriveloggedIn").show();
    } else {
        $('#authorize-button').show();
        $('#signout-button').hide();

        if(SHOW_CREATE){
            $("GoogleDriveFilesList").hide()
            $("GoogleDriveCreateForm").show();
        }
        GoogleDriveHideFiles()
        $("#GoogleDriveloggedIn").hide();
    }
    $("#GoogleDrivebuttons").fadeIn();
}

function GoogleDriveListFiles() {
    $('#FileList').html("");
    gapi.client.drive.files.list({
        'pageSize': 100,
        'fields': "nextPageToken, files(id, name)",
        'q': "name contains '.wmProj'",
    }).then(function(response) {
        var files = response.result.files;

        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $("#FileList").append('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"><button class="GoogleDrivefileBtn" id="' + file.id + '">                <svg class="" width="50" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 235 234.3">                <g id="Layer_x0020_1">                <g id="_921457168">                <path class="logo-top" d="M194.1 65.8L135.8 7.5c-10.1-10.1-26.5-10.1-36.6 0L41.1 65.7c-3.4 3.4-3.4 8.8 0 12.2l17.6 17.6 11.7 10.9c3.5 3.2 8.8 3.2 12.3 0l23.5-21.7c6.5-6 16.4-6 22.8 0l23.5 21.7c3.5 3.2 8.8 3.2 12.3 0l11.7-10.9L194.1 78c3.3-3.3 3.3-8.8 0-12.2z" />                <path class="logo-bottom" d="M7.9 135.5l91.3 91.3c10.1 10.1 26.5 10.1 36.6 0l91.3-91.3c15.8-15.8 4.7-20.5-6.9-31.5l-14.3-13.6c-3.4-3.3-8.8-3.2-12.3 0l-23.5 21.7c-6.5 6-16.4 6-22.8 0l-23.5-21.7a9.08 9.08 0 0 0-12.3 0L88 112.1c-6.5 6-16.4 6-22.8 0L41.7 90.4a9.08 9.08 0 0 0-12.3 0l-13.2 12.2c-12.1 11.2-24.8 16.3-8.3 32.9z" />            </g>                </g>                </svg>  <BR>                ' + file.name + '</button></div>');
            }

            $(".GoogleDrivefileBtn").unbind().click(function() {
                GoogleDriveReadFileContents($(this).attr("id"));
            })
        } else {
            $("#FileList").append('<div class="alert alert-danger">You do not have any Wavemaker project files in your Google Drive!</div>');
        }
    });

}

function GoogleDriveHideFiles() {
    $('#FileList').html("");
}

function GoogleDriveReadFileContents(file) {



    var request = gapi.client.drive.files.get({
        fileId: file,
        alt: 'media'
    })
    request.then(function(response) {

        WaveMaker = JSON.parse(response.body);
        filename = $("#" + file).text()

        res = filename.replace(".wmProj", "")

        CURRENT_FILE_NAME=res.trim();

        CURRENT_FILE_OBJ = response;
        CURRENT_FILE_ID = file;
        autosaveTrigger = true;
        $("#gdrive").hide()

                EditorInit();
    }, function(error) {
        //console.error(error)
    })
    return request; //for batch request
}



function GoogleDriveCreateNewFile() {
    newFilename = document.getElementById("newFile").value
    if (newFilename === "") {
        alert("You need to add Project Name");
        return false;
    } else {
        GoogleDriveCreateNewFileWrite(newFilename + ".wmProj", JSON.stringify(WaveMaker))
    }
}


function GoogleDriveCreateNewFileWrite(name, data, callback) {
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    const contentType = 'application/json';

    var metadata = {
        'name': name,
        'mimeType': contentType
    };

    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n\r\n' +
        data +
        close_delim;

    var request = gapi.client.request({
        'path': '/upload/drive/v3/files',
        'method': 'POST',
        'params': {
            'uploadType': 'multipart'
        },
        'headers': {
            'Content-Type': 'multipart/related; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody
    });
    if (!callback) {
       SHOW_CREATE=false;
        callback = function(file) {
        CURRENT_FILE_OBJ=file;
        CURRENT_FILE_ID=file.id;
        CURRENT_FILE_NAME=name.replace(".wmProj", "").trim();
            autosaveTrigger = true;
        $("#gdrive").hide()
        };
    }
    request.execute(callback);
}

function writeHTMLoutputGoogleDrive(data, callback){

if(CURRENT_FILE_NAME==""){
  swal("Sorry!", "You need to save your project first!", "error");
}else{

  const boundary = '-------314159265358979323846';
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";
  const contentType = 'application/text';
  var metadata = {
      'name': CURRENT_FILE_NAME+".txt",
      'mimeType': contentType
  };

  var multipartRequestBody =
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: ' + contentType + '\r\n\r\n' +
      data +
      close_delim;

  var request = gapi.client.request({
      'path': '/upload/drive/v3/files',
      'method': 'POST',
      'params': {
          'uploadType': 'multipart'
      },
      'headers': {
          'Content-Type': 'multipart/related; boundary="' + boundary + '"'
      },
      'body': multipartRequestBody
  });
  if (!callback) {
     SHOW_CREATE=false;
      callback = function(file) {
      CURRENT_FILE_OBJ=file;
      CURRENT_FILE_ID=file.id;

      $("#gdrive").hide()
      };
  }
  request.execute(callback);
}//end if statement for filename
}




function GoogleDriveSaveFile() {
  $("#saveAlert").fadeIn();

    fileID = CURRENT_FILE_ID;
    fileMetadata = CURRENT_FILE_OBJ.headers;
    data = JSON.stringify(WaveMaker);


    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    const contentType = 'application/json';

    var metadata = {
        'name': name,
        'mimeType': contentType
    };

    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n\r\n' +
        data +
        close_delim;

    var request = gapi.client.request({
        'path': '/upload/drive/v3/files/' + fileID,
        'method': 'PATCH',
        'params': {
            'uploadType': 'multipart'
        },
        'headers': {
            'Content-Type': 'multipart/related; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody
    });

    callback = function(file) {
        autosaveTrigger = true;
        GoogleDriveInit()
    }
    request.execute(callback);
}




function loadDataGdrive() {
    //Load the google drive HTML into a fullscreen window that is appended to the boundary
    $("#gdrive").load("html/google-drive-filesystem.html", function() {
        $("#gdrive").show();
        GoogleDrivehandleClientLoad()
    })
}

function createNewGdriveFile(){
    $("#gdrive").load("html/google-drive-filesystem.html", function() {
        $("#gdrive").show();
        SHOW_CREATE=true;
        GoogleDrivehandleClientLoad()
    })
}

function saveDataGdrive(){
    if(CURRENT_FILE_ID!==""){
        GoogleDriveSaveFile()
    }else{

        createNewGdriveFile();
    }
}

function closeGdrive(){
    $("#gdrive").hide();
}
