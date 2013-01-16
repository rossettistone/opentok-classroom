if (Meteor.isClient) {
  // Template.container.greeting = function () {
  //   return "Welcome to opentok-classroom.";
  // };

  Template.chat.events({
    'click input.btn' : function() {
      var chatMessage = document.getElementById("chatbox").value;
      var timestamp = moment(new Date()).fromNow();
      console.log(chatMessage);
      console.log(timestamp);
    }
  });

}
