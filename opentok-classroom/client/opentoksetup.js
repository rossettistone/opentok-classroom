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
  session = TB.initSession(sessionId);  // Initialize session

  // Add event listeners to the session
  session.addEventListener('sessionConnected', sessionConnectedHandler);
  session.addEventListener('sessionDisconnected', sessionDisconnectedHandler);
  session.addEventListener('connectionCreated', connectionCreatedHandler);
  session.addEventListener('connectionDestroyed', connectionDestroyedHandler);
  session.addEventListener('streamCreated', streamCreatedHandler);
  session.addEventListener('streamDestroyed', streamDestroyedHandler);
}

//--------------------------------------
//  LINK CLICK HANDLERS
//--------------------------------------

/*
If testing the app from the desktop, be sure to check the Flash Player Global Security setting
to allow the page from communicating with SWF content loaded from the web. For more information,
see http://www.tokbox.com/opentok/build/tutorials/helloworld.html#localTest
*/
function connect() {
  session.connect(apiKey, token);
}

function disconnect() {
  session.disconnect();
  hide('disconnectLink');
  hide('publishLink');
  hide('unpublishLink');
}

// Called when user wants to start publishing to the session
function startPublishing() {
  if (!publisher) {
    var parentDiv = document.getElementById("myCamera");
    var publisherDiv = document.createElement('div'); // Create a div for the publisher to replace
    publisherDiv.setAttribute('id', 'opentok_publisher');
    parentDiv.appendChild(publisherDiv);
    var publisherProps = {width: VIDEO_WIDTH, height: VIDEO_HEIGHT};
    publisher = TB.initPublisher(apiKey, publisherDiv.id, publisherProps);  // Pass the replacement div id and properties
    session.publish(publisher);
    show('unpublishLink');
    hide('publishLink');
  }
}

function stopPublishing() {
  if (publisher) {
    session.unpublish(publisher);
  }
  publisher = null;

  show('publishLink');
  hide('unpublishLink');
}

//--------------------------------------
//  OPENTOK EVENT HANDLERS
//--------------------------------------

function sessionConnectedHandler(event) {
  // Subscribe to all streams currently in the Session
  for (var i = 0; i < event.streams.length; i++) {
    addStream(event.streams[i]);
  }
  show('disconnectLink');
  show('publishLink');
  hide('connectLink');
}

function streamCreatedHandler(event) {
  // Subscribe to the newly created streams
  for (var i = 0; i < event.streams.length; i++) {
    addStream(event.streams[i]);
  }
}

function streamDestroyedHandler(event) {
  // This signals that a stream was destroyed. Any Subscribers will automatically be removed.
  // This default behaviour can be prevented using event.preventDefault()
}

function sessionDisconnectedHandler(event) {
  // This signals that the user was disconnected from the Session. Any subscribers and publishers
  // will automatically be removed. This default behaviour can be prevented using event.preventDefault()
  publisher = null;

  show('connectLink');
  hide('disconnectLink');
  hide('publishLink');
  hide('unpublishLink');
}

function connectionDestroyedHandler(event) {
  // This signals that connections were destroyed
}

function connectionCreatedHandler(event) {
  // This signals new connections have been created.
}

/*
If you un-comment the call to TB.setLogLevel(), above, OpenTok automatically displays exception event messages.
*/
function exceptionHandler(event) {
  alert("Exception: " + event.code + "::" + event.message);
}

//--------------------------------------
//  HELPER METHODS
//--------------------------------------

function addStream(stream) {
  // Check if this is the stream that I am publishing, and if so do not publish.
  if (stream.connection.connectionId == session.connection.connectionId) {
    return;
  }
  var subscriberDiv = document.createElement('div'); // Create a div for the subscriber to replace
  subscriberDiv.setAttribute('id', stream.streamId); // Give the replacement div the id of the stream as its id.
  document.getElementById("subscribers").appendChild(subscriberDiv);
  var subscriberProps = {width: VIDEO_WIDTH, height: VIDEO_HEIGHT};
  subscribers[stream.streamId] = session.subscribe(stream, subscriberDiv.id, subscriberProps);
}

function show(id) {
  document.getElementById(id).style.display = 'block';
}

function hide(id) {
  document.getElementById(id).style.display = 'none';
}
