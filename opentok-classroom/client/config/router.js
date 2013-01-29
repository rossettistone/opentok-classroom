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

  '/classrooms/:roomId/:document_id': function (document_id) {
    Session.set("document_id", document_id);
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