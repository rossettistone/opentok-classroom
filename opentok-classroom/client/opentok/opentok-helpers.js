function connect() {
  session.connect(apiKey, token);
}

function disconnect() {
  session.disconnect();
}

function startPublishing() {
  if (!publisher) {
    var parentDiv = document.getElementById("myCamera");
    var publisherDiv = document.createElement('div'); // Create a div for the publisher to replace
    publisherDiv.setAttribute('id', 'opentok_publisher');
    parentDiv.appendChild(publisherDiv);
    var publisherProps = {width: SELF_WIDTH, height: SELF_HEIGHT};
    publisher = TB.initPublisher(apiKey, publisherDiv.id, publisherProps);  // Pass the replacement div id and properties
    session.publish(publisher);
  }
}

function stopPublishing() {
  if (publisher) {
    session.unpublish(publisher);
  }
  publisher = null;

}

function sessionConnectedHandler(event) {
  // Subscribe to all streams currently in the Session
  for (var i = 0; i < event.streams.length; i++) {
    addStream(event.streams[i]);
  }
  
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

}

function connectionDestroyedHandler(event) {
  // This signals that connections were destroyed
}

function connectionCreatedHandler(event) {
  // This signals new connections have been created.
}


// If you un-comment the call to TB.setLogLevel(), in opentok-setup.js, OpenTok automatically displays exception event messages.

function exceptionHandler(event) {
  alert("Exception: " + event.code + "::" + event.message);
}

function addStream(stream) {
  // Check if this is the stream that I am publishing, and if so do not publish.
  if (stream.connection.connectionId == session.connection.connectionId) {
    return;
  }
  var subscriberDiv = document.createElement('div'); // Create a div for the subscriber to replace
  subscriberDiv.setAttribute('id', stream.streamId); // Give the replacement div the id of the stream as its id.
  document.getElementById("subscribers").appendChild(subscriberDiv);
  var subscriberProps = {width: SUBSCRIBERS_WIDTH, height: SUBSCRIBERS_HEIGHT};
  subscribers[stream.streamId] = session.subscribe(stream, subscriberDiv.id, subscriberProps);
}

function show(id) {
  document.getElementById(id).style.display = 'inline';
}

function hide(id) {
  document.getElementById(id).style.display = 'none';
}
