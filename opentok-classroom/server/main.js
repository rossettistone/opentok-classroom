Meteor.startup(function () {
  var allUsers = Meteor.users.find({}).fetch()
  _.each(allUsers, function (user, key, object) {
    if(!user.role) {
      Meteor.users.update({_id: user._id}, {$set: {role: 'student'}});
    }
  });
});

Meteor.methods({
  setRole: function (user_id, newRole) {
    Meteor.users.update({_id: user_id}, {$set: {profile: {role: newRole}}});
  }
});
