Template.container.classrooms = function() {
  return Classrooms.find({});
};

Template.classlistings.classrooms = function() {
  return Classrooms.find({});
};

Template.newclassform.events({
  'click input.btn' : function() {
    var username = Meteor.user().username;
    var roomname = document.getElementById("roomname").value;
    Classrooms.insert({name: roomname, owner:username, chatlogs:[]});
  }
});

Template.classlistings.events({
  'click div' : function() {
    var roomId = this._id;
    Session.set('roomClicked', roomId);
  }
});
