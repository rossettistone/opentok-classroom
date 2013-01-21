Meteor.Router.add({
  '/welcome': 'welcome',

  '/classrooms': function () {
    Session.set('roomClicked', undefined);
    return 'classrooms';
  },

  '/classrooms/:roomId': function (roomId) {
    Session.set('roomClicked', roomId);
  },

  '*': 'not_found'
});
