
var debugMode = true
function wlog(label, message){
    // this is here because I may want people to turn on debug mode and send me console output. 
    // Will be set to FALSE at deployment to hide all console commands - called with window.wlog("SomeString")
    if (debugMode){
        console.log(label, message)
    }
}

function CheckElectron() {
if (typeof require !== 'function') return false;
if (typeof window !== 'object') return false;
try {
const electron = require('electron');
if (typeof electron !== 'object') return false;
} catch(e) {
return false;
}
return true;
}


var isElectron = CheckElectron()


if(isElectron){
var fs = require('fs');
console.log("Electron Baby")
}else{
console.log("Not electron")
}
