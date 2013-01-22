Meteor.Router.add({
  '': 'welcome',

  '/welcome': 'welcome',

  '/classrooms': function () {
    Session.set('roomClicked', undefined);
    return 'classrooms';
  },

  '/classrooms/:roomId': function (roomId) {
    Session.set('roomClicked', roomId);
  },

  ':document_id': function (document_id) {
    Session.set("document_id", document_id);
  },

  '*': 'not_found'
});
