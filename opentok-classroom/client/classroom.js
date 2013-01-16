Template.classroom.activeRoom = function () {
  return (Session.get('roomClicked') === this._id)
}

Template.chatlogs.chatMessages = function() {
  return this.chatlogs;
};

Template.chatinput.events({
  'click input.btn' : function() {
    var username = Meteor.user().username;
    var chatmessage = document.getElementById("chatbox").value;
    var timestamp = moment(new Date()).fromNow();
    Classrooms.update({_id: this._id}, {$push: {chatlogs: {author: username, message: chatmessage}}});
  }
});
