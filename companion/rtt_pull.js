
export function RTT_PULL(b64creds) {
  if (b64creds !== undefined) {
    this.b64creds = b64creds;

  }
  else {
    // Base64 Encoded Credentials
    this.b64creds = "cnR0YXBpX05pdGluRzo1Y2I1MjkwNTRlZjhmNDhkZTU1ZTg0YzZlZDczYzkwNzkyNmI0MmIw";
  }
};

var RTT_PULL_URL = "https://api.rtt.io/api/v1/json/search/";

RTT_PULL.prototype.liveDepartures = function(origin, destination) {
  
  let self = this;
  
  return new Promise(function(resolve, reject) {
    
    let url = RTT_PULL_URL + origin;
   
    if (destination !== undefined) {
      url += "/to/" + destination;
    }
    
    console.log("Fetching request " + url);
    
    let headers = new Headers();
    
    headers.append('Authorization', 'Basic ' + self.b64creds);
    
    fetch(url, {method: 'GET', headers: headers, })
      .then(function(response) { console.log("Response status is : " + response.statusText); return response.json();})
      .then(function(json) {
            
      //console.log("Got JSON response from server:" + JSON.stringify(json));
                 
      let dlist = json.services;
      
      let departures = [];
      
      dlist.forEach( (service) => {
          
            // console.log("Destination : " + service.locationDetail.destination[0].description);
            // console.log("Departure Time : " + service.locationDetail.gbttBookedDeparture);
            // console.log("Platform : " + service.locationDetail.platform);
            // console.log("Platform Confirmed? : " + (service.locationDetail.platformConfirmed === "true" ? "Yes" : "No"));
            // console.log("Current Status : " + (service.locationDetail.serviceLocation === undefined ? "Unknown" : service.locationDetail.serviceLocation));
            // console.log(" ============================================= ");
        
        let train = {
          
          "train_to" : service.locationDetail.destination[0].description,
          "dep_time" : service.locationDetail.gbttBookedDeparture,
          "platform" : service.locationDetail.platform,
          "plat_conf": (service.locationDetail.platformConfirmed === true ? "Yes" : "No"),
          "cur_status" : (service.locationDetail.serviceLocation === undefined ? "0" : service.locationDetail.serviceLocation)
          
        };
        
        if (!Number.isInteger(parseInt(train["dep_time"]))) {
             train["dep_time"] = 0;
           }
        
        departures.push(train);
        
      });
      
      //departures.sort( (a,b) => { return (a["dep_time"] - b["dep_time"]) } );
      
      // departures.forEach( (service) => {
      //   console.log("Destination : " + service["train_to"] + "   Departure Time : " + service["dep_time"] + "   Platform : " + service["platform"]);        
      // });
      
      resolve(departures);
      
    }).catch(function (error) {
      console.log(error.message);
      reject(error);
    });
  });
}