const { writeFileSync } = require('fs')
const ics = require('ics')

ics.createEvent({
  start: [2026, 1, 13, 13, 0],
  duration: { hours: 1, minutes: 0 },
  title: "Gov. Hochul's 2026 State of the State Address",
  description: "On January 13, 2026, Governor Hochul is delivering her 2026 State of the State Address! Tune in to hear the governor's plans to make New York safer, more affordable, and a place where every family can thrive.",
  location: 'Virtual -- tune in at https://governor.ny.gov/SOTS2026',
  url: 'https://www.governor.ny.gov/SOTS2026'
}, (error, value) => {
  if (error) {
    console.log(error)
  }

  writeFileSync(`./calendar/SOTS2026.ics`, value)

/*
You cannot use fs in Frontend libraries like React so you rather import a module to save files to the browser as follow [  import { saveAs } from 'file-saver'; // For saving the file in the browser]
const blob = new Blob([value], { type: 'text/calendar' });
        saveAs(blob, `${title}.ics`);

*/
})