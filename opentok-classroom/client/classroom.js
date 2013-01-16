if (Meteor.isClient) {

  Template.classroom.activeRoom = function () {
    return (Session.get('roomClicked') === this._id)
  }

  Template.chatlogs.chatMessages = function() {
    return Chat.find({});
  };

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
