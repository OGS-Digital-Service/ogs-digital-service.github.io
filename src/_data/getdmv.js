const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  let url = "https://data.ny.gov/resource/9upz-c7xg.json";

  /* This returns a promise */
  return Cache(url, {
    duration: "1m", // save for 1 day
    type: "json"    // we’ll parse JSON for you
  });
};