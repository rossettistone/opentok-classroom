var apiKey = "22546652";
var sessionId = "1_MX4yMjU0NjY1Mn4xMjcuMC4wLjF-VHVlIEZlYiAyNiAxMToyMzo1NSBQU1QgMjAxM34wLjYxMTg1MzA2fg";
var token = "T1==cGFydG5lcl9pZD0yMjU0NjY1MiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz1jN2M5NTEyOGU0Y2FmYjlhNWQxNGI4Mjg5YTRmODM2YTljZjQ0MWNkOnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9MV9NWDR5TWpVME5qWTFNbjR4TWpjdU1DNHdMakYtVkhWbElFWmxZaUF5TmlBeE1Ub3lNem8xTlNCUVUxUWdNakF4TTM0d0xqWXhNVGcxTXpBMmZnJmNyZWF0ZV90aW1lPTEzNjE5MDY2Mzcmbm9uY2U9MC41MTUwMzMyNjg3NDI5MDM4JmV4cGlyZV90aW1lPTEzNjQ0OTg2MzcmY29ubmVjdGlvbl9kYXRhPQ==";

var session;
var publisher;
var subscribers = {};
var SUBSCRIBERS_WIDTH = 270;
var SUBSCRIBERS_HEIGHT = 195;
var SELF_WIDTH = 160;
var SELF_HEIGHT = 120;

TB.addEventListener("exception", exceptionHandler);

if (TB.checkSystemRequirements() != TB.HAS_REQUIREMENTS) {
  alert("You don't have the minimum requirements to run this application."
      + "Please upgrade to the latest version of Flash.");
} else {
  session = TB.initSession(sessionId);

  session.addEventListener('sessionConnected', sessionConnectedHandler);
  session.addEventListener('sessionDisconnected', sessionDisconnectedHandler);
  session.addEventListener('connectionCreated', connectionCreatedHandler);
  session.addEventListener('connectionDestroyed', connectionDestroyedHandler);
  session.addEventListener('streamCreated', streamCreatedHandler);
  session.addEventListener('streamDestroyed', streamDestroyedHandler);
}
