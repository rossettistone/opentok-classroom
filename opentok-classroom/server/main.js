Meteor.startup(function () {
  var require = __meteor_bootstrap__.require
  Future = require('fibers/future');

  var allUsers = Meteor.users.find({}).fetch()
  _.each(allUsers, function (user, key, object) {
    console.log(user)
    if(!user.role) {
      Meteor.users.update({_id: user._id}, {$set: {role: 'student'}});
    }
  });
});

Meteor.methods({
  setRole: function (user_id, newRole) {
    Meteor.users.update({_id: user_id}, {$set: {role: newRole}});
    console.log(Meteor.users.find({_id: user_id}).fetch());
  }
});