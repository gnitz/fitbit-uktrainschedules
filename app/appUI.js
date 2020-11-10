import document from "document";
import { MAX_LIST_SIZE, SERVICE_LOC, STATIONS } from "../common/globals.js";

export function appUI(src, dst) {
  
  this.trainList = document.getElementById("trainList");
  this.statusText = document.getElementById("status");
  this.src = src;
  this.dst = dst;
  
  this.tileListHeader = document.getElementById("train-list-header");
  
  this.tiles = [];
  
  for (let i = 0; i < MAX_LIST_SIZE; i++) {
    let tile = document.getElementById(`train-${i}`);
    if (tile) {
      this.tiles.push(tile);
    }
  }
  console.log("Created " +i + " tile objects");
}

appUI.prototype.update = function(state, departures) {
  if (state === "loaded") {
    this.trainList.style.display = "inline";
    this.statusText.text = "";
    this.updateDepartureList(departures);
    //console.log("Received list of stations");
    
  }
  else {
    this.trainList.style.display = "none";

    if (state === "loading") {
      this.statusText.text = "Loading departures ...";
    }
    else if (state === "disconnected") {
      this.statusText.text = "Please check connection to phone and Fitbit App"
    } 
    else if (state === "first-run") {
      this.statusText.text = "Please configure atleast one route within application settings on the FitBit Android app."  
    }
    else if (state === "error") {
      this.statusText.text = "Something terrible happened.";
    }
  }
}

appUI.prototype.updateDepartureList = function(departures) {
  
  this.tileListHeader.getElementById("train-header-text").text = this.src + " -> " + (this.dst === undefined ? "ANY" : this.dst);
    
  console.log("<set href='group/text' attributeName='text-buffer' to='" + this.src + " -> " + (this.dst === undefined ? "ANY" : this.dst) +  "' />");
  
  for (let i = 0; i < MAX_LIST_SIZE; i++) {
    
    let tile = this.tiles[i];
    if (!tile) {
      continue;
    }

    const list_entry = departures[i];
    
    if (!list_entry) {
      tile.style.display = "none";
      continue;
    }

    tile.style.display = "inline";
    
    
    // Adjust font-size to accomodate large station names
    
    if (list_entry.train_to.length > 37) {
      tile.getElementById("destination").style.fontSize = 16;  
    } else if (list_entry.train_to.length > 30) {
      tile.getElementById("destination").style.fontSize = 18;  
    } else if (list_entry.train_to.length > 25) {
      tile.getElementById("destination").style.fontSize = 22;
    } else if (list_entry.train_to.length > 20) {
      tile.getElementById("destination").style.fontSize = 25;
    } else {
      tile.getElementById("destination").style.fontSize = 30;
    }
    
    tile.getElementById("destination").text = list_entry.train_to;

    console.log(list_entry.train_to);
    
    tile.getElementById("dep_time").text = "Departure : " + list_entry.dep_time.substr(0, 2) + ":" + list_entry.dep_time.substr(2, 3);
    
    tile.getElementById("platform").text = "Platform : " + list_entry.platform;
    
    if (list_entry.plat_conf == "Yes") {
       
    tile.getElementById("plat_conf").text = "(Confirmed)";
    tile.getElementById("plat_conf").style.fill = "greenyellow";
    
    } 
    
    if (list_entry.cur_status != "0") {
      
      console.log("Service location is available");
      tile.getElementById("cur_status").text =  (SERVICE_LOC[list_entry.cur_status] === undefined? list_entry.cur_status : SERVICE_LOC[list_entry.cur_status] ); 
      
    } else {
      tile.getElementById("cur_status").style.fill = "grey";
      tile.getElementById("cur_status").text = "Status not available";     
    }
    //tile.getElementById("plat_conf").text = "Plat. Confirmed? : " + list_entry.plat_conf;
  }
  
}