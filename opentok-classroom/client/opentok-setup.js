var apiKey = "22546652";
var sessionId = "2_MX4yMjU0NjY1Mn4xMjcuMC4wLjF-VHVlIEphbiAxNSAxODozMDoxMiBQU1QgMjAxM34wLjMyMzUxMzV-";
var token = "T1==cGFydG5lcl9pZD0yMjU0NjY1MiZzaWc9MWY5NzY0NDRiOWEwNTQxYmZkMzc3Y2M1MzU4NDU2ZmQ1YjExMDcwYTpzZXNzaW9uX2lkPTJfTVg0eU1qVTBOalkxTW40eE1qY3VNQzR3TGpGLVZIVmxJRXBoYmlBeE5TQXhPRG96TURveE1pQlFVMVFnTWpBeE0zNHdMak15TXpVeE16Vi0mY3JlYXRlX3RpbWU9MTM1ODMwMzQzMiZleHBpcmVfdGltZT0xMzU4Mzg5ODMyJnJvbGU9cHVibGlzaGVyJm5vbmNlPTI4ODExMCZzZGtfdmVyc2lvbj10Yi1kYXNoYm9hcmQtamF2YXNjcmlwdC12MQ==";

var session;
var publisher;
var subscribers = {};
var VIDEO_WIDTH = 320;
var VIDEO_HEIGHT = 240;

TB.addEventListener("exception", exceptionHandler);

// Un-comment the following to set automatic logging:
// TB.setLogLevel(TB.DEBUG);

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
