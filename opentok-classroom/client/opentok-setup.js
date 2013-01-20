var apiKey = "22546652";
var sessionId = "2_MX4yMjU0NjY1Mn4xMjcuMC4wLjF-U2F0IEphbiAxOSAxNjoxNjozNSBQU1QgMjAxM34wLjYzMDExODM3fg";
var token = "T1==cGFydG5lcl9pZD0yMjU0NjY1MiZzaWc9OTA5NjNmZTE1YzA5MWJkMTg2ZjM2YjljNzRjZTdhYTRlZDEwYmVlMjpzZXNzaW9uX2lkPTJfTVg0eU1qVTBOalkxTW40eE1qY3VNQzR3TGpGLVUyRjBJRXBoYmlBeE9TQXhOam94Tmpvek5TQlFVMVFnTWpBeE0zNHdMall6TURFeE9ETTNmZyZjcmVhdGVfdGltZT0xMzU4NjQxMDEzJmV4cGlyZV90aW1lPTEzNjEyMzMwMTMmcm9sZT1wdWJsaXNoZXImbm9uY2U9NDkyNTQwJnNka192ZXJzaW9uPXRiLWRhc2hib2FyZC1qYXZhc2NyaXB0LXYx";

var session;
var publisher;
var subscribers = {};
var VIDEO_WIDTH = 480;
var VIDEO_HEIGHT = 360;

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
