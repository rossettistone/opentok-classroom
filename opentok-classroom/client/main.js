if (Meteor.isClient) {
  // Template.container.greeting = function () {
  //   return "Welcome to opentok-classroom.";
  // };

  Template.chatlogs.chatMessages = function() {
    return Chat.find({});
  }

  Template.chatinput.events({
    'click input.btn' : function() {
      var username = Meteor.user().username;
      var chatMessage = document.getElementById("chatbox").value;
      var timestamp = moment(new Date()).fromNow();
      console.log(chatMessage);
      console.log(timestamp);
      Chat.insert({user: username, message:chatMessage, timestamp:timestamp});
    }
  });
}
