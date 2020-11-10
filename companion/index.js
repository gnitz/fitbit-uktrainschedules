/*
 * Entry point for the companion app
 */
import { me } from "companion";
import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { RTT_PULL } from "./rtt_pull.js";

import { MAX_LIST_SIZE } from "../common/globals.js";

console.log("Companion code started");

var srcStn = settingsStorage.getItem()

 
// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  messaging.peerSocket.send("Beaming data!");
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
  
  var data = evt.data;
  
  console.log("Source Station is : " + data.origin);
  
  if (data.origin = undefined) {
    
    
    
  }
  
  getLiveDepartures(data.origin, data.destination);

}

messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});


function getLiveDepartures(origin, destination) {
  
  let rtt_client = new RTT_PULL();
  
  rtt_client.liveDepartures(origin, destination).then(function(departures) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      // Limit results to the number of tiles available in firmware
      departures.splice(MAX_LIST_SIZE, departures.length);
      messaging.peerSocket.send(departures);
    }
  }).catch(function (e) {
    console.log("error : "); console.log(e.message);
  });
}

settingsStorage.onchange = function(evt) {
  getLiveDepartures();
}


