Template.classroom.activeRoom = function () {
  return (Session.get('roomClicked') === this._id)
}

Template.chatinput.events({
  'click input.btn' : function() {
    var username = Meteor.user().username;
    var chatmessage = document.getElementById("chatbox").value;
    var timestamp = moment(new Date()).fromNow();
    Classrooms.update({_id: this._id}, {$push: {chatlogs: {author: username, message: chatmessage}}});
  }
});

Template.classroom.events({
  'click input.btn' : function() {
    Session.set('roomClicked', undefined);
  }
});
