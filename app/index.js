/*
 * Entry point for the watch app
 */

const API_CALL_INTERVAL = 10

import document from "document";
import * as messaging from "messaging";
import { appUI } from "./appUI.js";


//let demotext = document.getElementById("statustext");
let view1 = document.getElementById("view1");
let depView = document.getElementById("dep_view");
let btnRefresh = document.getElementById("btnRefresh");
let btnSettings = document.getElementById("btnSettings");


var lastRefresh = new Date().getTime();
var btnRefresh_anim = false;
var btnSettings_anim = false;

//demotext.text = "YEh ho gaya change";

let depList = new appUI(srcStn, dstStn);

depList.update("disconnected");


messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  depList.update("loading");
  getUpdatedSchedule();
}


messaging.peerSocket.addEventListener("message", (evt) => {

  depList.update("loaded", evt.data);
    
});



btnRefresh.onactivate = function(evt) {
  var curTime = new Date().getTime();
  // Check if view was refreshed in the last 10 seconds, avoids excessive calls to the API
  
  if (((curTime - lastRefresh)/1000) > API_CALL_INTERVAL ) {
    depList.update("loading");
    getUpdatedSchedule();
    btnRefresh.disable();
    lastRefresh = curTime;
    
    setTimeout(function() {
    btnRefresh.enable();
    btnRefresh.animate("mouseup");
    }, 10000);
    
  } 
  
  if (!btnRefresh_anim) {
    btnRefresh.animate("enable");
    btnRefresh_anim = true;
    setTimeout(function() {
      btnRefresh_anim=false;
    }, 3000);
  }
  
}

btnRefresh.onmousedown = function(evt) {
    if (!btnRefresh_anim) {
    btnRefresh.animate("enable");
    btnRefresh_anim = true;
    setTimeout(function() {
      btnRefresh_anim=false;
    }, 3000);
  }
  
}

btnSettings.onactivate = function(evt) {
  if (!btnSettings_anim) {
    btnSettings.animate("enable");
    btnSettings_anim = true;
    setTimeout(function() {
      btnSettings_anim=false;
    }, 3000);
  }
  
}

btnSettings.onmousedown = function(evt) {
  if (!btnSettings_anim) {
    btnSettings.animate("enable");
    btnSettings_anim = true;
    setTimeout(function() {
      btnSettings_anim=false;
    }, 3000);
  } 
}


btnRefresh.onload = function(evt) {
  btnRefresh.animate("load");
}

btnSettings.onload = function(evt) {
  btnSettings.animate("click");
}




function getUpdatedSchedule() {
  // Sample data

 
    if (srcStn) {
    try {
      srcStn = JSON.parse(srcStn);
    }
    catch (e) {
      console.log("error parsing setting value: " + e);
    }
    }

    if (!srcStn || typeof(srcStn) !== "object" || srcStn.length < 1 || typeof(srcStn[0]) !== "object") {

      depList.update("first-run");
    
    }
    else {
      srcStn = srcStn[0].value;
    }
  
  
    if (dstStn) {
    try {
      dstStn = JSON.parse(dstStn);
    }
    catch (e) {
      console.log("error parsing setting value: " + e);
    }
    }

    if (!dstStn || typeof(dstStn) !== "object" || dstStn.length < 1 || typeof(dstStn[0]) !== "object") {

      dstStn = undefined;
    
    }
    else {
      dstStn = dstStn[0].value;
    }
  
    const data = {
      "origin": srcStn,
      "destination": dstStn
    }

    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(data);
  }
}
