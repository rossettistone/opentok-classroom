Meteor.Router.add({
  '/welcome': 'welcome',

  '/profile': 'profile',

  '/classrooms': 'classrooms',

  '*': 'not_found'
});