Template.profile.events({
  'click button.btn-primary' : function (e) {
    e.preventDefault();
    Session.set('changesSaved', true);
    Meteor.setTimeout(function () {
      Session.set('changesSaved', false)
    }, 5 * 1000);
    Session.set('openProfile', false);
  }
})