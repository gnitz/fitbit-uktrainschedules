import { STATIONS } from "../common/globals.js"

let autoValues = [];
for (let key in STATIONS) {
  autoValues.push( {
    "name": STATIONS[key],
    "value": { code: key }
  } );
}

function TrainSettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="left">London Realtime Train Schedules</Text>}>
        
        <Text> Configure favorite routes below for quick access from the app. Some stations may use city pre-fixes - e.g. London Kings Cross </Text>
        
       </Section>
       
       <Section
          description={<Text>TIP: Choose "NONE" in the source field to disregard a route. Choose "ANY" in the destination field to show all departures from the source station</Text>}
         
          title={<Text bold align="left">Favorite Routes</Text>}>
         
         <Text bold fill="red"> Route 1 </Text>
         
         <TextInput
          title="Select Station"
          label={<Text italic>Source Station</Text>}
          placeholder="Type station name"
          settingsKey="route1_source_station"
          action="Add Item"
          onAutocomplete={(value) => {
            return autoValues.filter((option) =>
                  option.name.toLowerCase().includes(value.toLowerCase()));
          }}
        />
         
         <TextInput
          title="Select Station"
          label={<Text italic>Destination Station</Text>}
          placeholder="Type station name"
          settingsKey="route1_destination_station"
          action="Add Item"
          onAutocomplete={(value) => {
            return autoValues.filter((option) =>
                  option.name.toLowerCase().includes(value.toLowerCase()));
          }}
        />
         
         <Text bold> Route 2 </Text>
            
         <TextInput
          title="Select Station"
          label={<Text italic>Source Station</Text>}
          placeholder="Type station name"
          settingsKey="route2_source_station"
          action="Add Item"
          disabled={!(props.settings.toggleRoute2Input === "true")}
          onAutocomplete={(value) => {
            return autoValues.filter((option) =>
                  option.name.toLowerCase().includes(value.toLowerCase()));
          }}
        />
         
         
         <TextInput
          title="Select Station"
          label={<Text italic>Destination Station</Text>}
          placeholder="Type station name"
          settingsKey="route2_destination_station"
          action="Add Item"
          disabled={!(props.settings.toggleRoute2Input === "true")}
          onAutocomplete={(value) => {
            return autoValues.filter((option) =>
                  option.name.toLowerCase().includes(value.toLowerCase()));
          }}
        />
         
         <Toggle
          label="Enable Route?"
          settingsKey="toggleRoute2Input"
         />
         
         <Text bold> Route 3 </Text>
         
         <TextInput
          title="Select Station"
          label={<Text italic>Source Station</Text>}
          placeholder="Type station name"
          settingsKey="route3_source_station"
          action="Add Item"
          disabled={!(props.settings.toggleRoute3Input === "true")}
          onAutocomplete={(value) => {
            return autoValues.filter((option) =>
                  option.name.toLowerCase().includes(value.toLowerCase()));
          }}
        />
         
         <TextInput
          title="Select Station"
          label={<Text italic>Destination Station</Text>}
          placeholder="Type station name"
          settingsKey="route3_destination_station"
          action="Add Item"
          disabled={!(props.settings.toggleRoute3Input === "true")}
          onAutocomplete={(value) => {
            return autoValues.filter((option) =>
                  option.name.toLowerCase().includes(value.toLowerCase()));
          }}
        />
         
         <Toggle
          label="Enable Route?"
          settingsKey="toggleRoute3Input"
         />
           
        </Section>

      
    </Page>  );
}

registerSettingsPage(TrainSettings);