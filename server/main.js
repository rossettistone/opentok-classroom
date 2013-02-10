Meteor.methods({
  setRole: function (user_id, newRole) {
    Meteor.users.update({_id: user_id}, {$set: {profile: {role: newRole}}});
  }
});

Accounts.onCreateUser(function(options, user) {
  options.profile = {
    role: "student"
  }
  if (options.profile)
    user.profile = options.profile;
  return user;
})