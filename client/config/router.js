Meteor.Router.add({
  '': function () {
    return 'welcome';
  },

  '/welcome': function () {
    return 'welcome';
  },

  '/classrooms': function () {
    return 'classrooms';
  },

  '/classrooms/:roomId': function (roomId) {
    Session.set("document_id", undefined);
    Session.set('currentRoom', roomId);
    return 'classroom';
  },

  '*': 'not_found'
});

Meteor.Router.filter('checkLoggedIn', {except: ['welcome', 'not_found'] });

Meteor.Router.filters({
  'checkLoggedIn': function(page) {
    if (Meteor.loggingIn()) {
      return 'loading';
    } else if (Meteor.user()) {
      return page;
    } else {
      return 'signin';
    }
  }
});