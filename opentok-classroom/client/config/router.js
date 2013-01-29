Meteor.Router.add({
  '': function () {
    Session.set('roomClicked', undefined);
    return 'welcome';
  },

  '/welcome': function () {
    Session.set('roomClicked', undefined);
    return 'welcome';
  },

  '/classrooms': function () {
    Session.set('roomClicked', undefined);
    return 'classrooms';
  },

  '/classrooms/:roomId': function (roomId) {
    Session.set("document_id", undefined);
    Session.set('roomClicked', roomId);
  },

  ':document_id': function (document_id) {
    Session.set("document_id", document_id);
  },

  '*': 'not_found'
});

Meteor.Router.filter('checkLoggedIn', {except: ['welcome'] });

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