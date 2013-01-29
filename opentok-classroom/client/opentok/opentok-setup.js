var apiKey = "22546652";
var sessionId = "2_MX4yMjU0NjY1Mn4xMjcuMC4wLjF-U3VuIEphbiAyMCAxNzowNTowMyBQU1QgMjAxM34wLjIxMjcwNTY3fg";
var token = "T1==cGFydG5lcl9pZD0yMjU0NjY1MiZzaWc9MTEzNmIwZjk0YTZkOWNlMzdjODEzYmJhMzViYzM4MzkwYjQzNzE0MTpzZXNzaW9uX2lkPTJfTVg0eU1qVTBOalkxTW40eE1qY3VNQzR3TGpGLVUzVnVJRXBoYmlBeU1DQXhOem93TlRvd015QlFVMVFnTWpBeE0zNHdMakl4TWpjd05UWTNmZyZjcmVhdGVfdGltZT0xMzU4NzMwMzE0JmV4cGlyZV90aW1lPTEzNjEzMjIzMTQmcm9sZT1wdWJsaXNoZXImbm9uY2U9OTM2Nzc1JnNka192ZXJzaW9uPXRiLWRhc2hib2FyZC1qYXZhc2NyaXB0LXYx";

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
