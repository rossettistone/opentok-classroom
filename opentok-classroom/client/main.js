Template.classlistings.classrooms = function() {
  return Classrooms.find({});
};

Template.newclassform.events({
  'click input.btn' : function() {
    var username = Meteor.user().username;
    var roomname = document.getElementById("roomname").value;
    Classrooms.insert({name: roomname, owner:username});
    console.log("new room created")
  }
});

Template.classlistings.events({
  'click div' : function() {
    var roomname = this.name;
    Session.set('roomClicked', roomname);
  }
});
