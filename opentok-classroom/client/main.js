Template.navbar.events({
  'click #profilebutton' : function () {
    Session.set('openProfile', true);
  }
});

Template.container.openProfile = function () {
  return Meteor.user() && Session.get('openProfile');
};

Template.container.recentSave = function () {
  return Session.get('changesSaved');
};

Template.container.classrooms = function () {
  return Classrooms.find({});
};

Template.classlistings.classrooms = function () {
  return Classrooms.find({});
};

Template.container.inClass = function () {
  return Session.get('roomClicked');
};

Template.container.isTeacher = function () {
  if(Meteor.user().hasOwnProperty('profile')) {
    return Meteor.user().profile.role === 'teacher';
  } else {
    return false
  }
}

Template.container.events({
  'click a' : function (e) {
    e.preventDefault();
  }
});

Template.newclassform.events({
  'click input.btn' : function () {
    var username = Meteor.user().username;
    var roomname = document.getElementById("roomname").value;
    Classrooms.insert({name: roomname, owner: username, chatlogs: []});
  }
});

Template.classlistings.events({
  'click a.classname' : function () {
    var roomId = this._id;
    Session.set('roomClicked', roomId);
  }
});
