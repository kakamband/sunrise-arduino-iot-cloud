const express = require("express");
const SunCalc = require("suncalc");
const PORT = process.env.PORT || 5000;

express()
  .get("/", (req, res) => res.json(calc()))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

function calc() {
  const place = "Seattle, WA";
  const latitude = 47.606209;
  const longitude = -122.332069;
  const timeZone = "America/Los_Angeles";

  const times = SunCalc.getTimes(new Date(), latitude, longitude);
  const unixTimes = {};
  const localTimes = {};
  const now = new Date();

  for (const property in times) {
    const localTime = times[property].toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });

    unixTimes[property] = Math.floor(times[property].getTime() / 1000);

    const options = {
      timeZone: timeZone,
      hour: "numeric",
      minute: "numeric",
    };
    localTimes[property] = new Intl.DateTimeFormat("en-US", options).format(
      times[property]
    );
  }

  return {
    latitude,
    longitude,
    place,
    now: now.toISOString(),
    localeTimeZone: timeZone,
    times,
    unixTimes,
    localTimes,
  };
}
