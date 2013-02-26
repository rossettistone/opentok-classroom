Handlebars.registerHelper("isTeacher", function () {
  if (Meteor.user().hasOwnProperty('profile')) {
    return Meteor.user().profile.role === 'teacher';
  } else {
    return false;
  }
});

Handlebars.registerHelper("openProfile", function () {
  return Session.get('openProfile');
});

Template.container.recentSave = function () {
  return Session.get('changesSaved');
};

Template.container.classrooms = function () {
  return Classrooms.find({});
};

Template.classrooms.classrooms = function () {
  return Classrooms.find({});
};

Template.container.inClass = function () {
  return Session.get('roomClicked');
};

Template.container.events({
  'click .lightbox-bg': function () {
    Session.set('hidelightbox', true);
  }
})

Template.welcome.events({
  'click .signup' : function () {
    $("#login-sign-in-link")[0].click();
  },
  'click .gotoclass' : function () {
    Meteor.Router.to('/classrooms');
  }
});

Template.newclassform.events({
  'click input.btn' : function () {
    var username = Meteor.user().username;
    var roomname = document.getElementById("roomname").value;
    Classrooms.insert({name: roomname, owner: username, chatlogs: []});
  }
});

Template.classrooms.events({
  'click a.classname' : function () {
    Meteor.Router.to('/classrooms/' + this._id);
  }
});

Template.navbar.events({
  'click #profilebutton' : function () {
    Session.set('openProfile', true);
  },
  'click .setstudent' : function () {
    Meteor.call('setRole', Meteor.userId(), 'student');
    Session.set('changesSaved', true);
    Meteor.setTimeout(function () {
      Session.set('changesSaved', false);
    }, 5 * 1000);
  },
  'click .setteacher' : function () {
    Meteor.call('setRole', Meteor.userId(), 'teacher');
    Session.set('changesSaved', true);
    Meteor.setTimeout(function () {
      Session.set('changesSaved', false);
    }, 5 * 1000);
  },
  'click .instructions': function () {
    Session.set('hidelightbox', false);
  }
});

Template.container.hidelightbox = function () {
  return Session.get('hidelightbox');
};
