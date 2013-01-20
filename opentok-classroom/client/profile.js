Template.profile.events({
  'click button.btn-primary' : function (e) {
    e.preventDefault();

    var newRole = document.getElementById('input01').value;
    Session.set('userRole', newRole)

    Session.set('changesSaved', true);
    Meteor.setTimeout(function () {
      Session.set('changesSaved', false);
    }, 5 * 1000);
    Session.set('openProfile', false);
  },
  'click button.exit' : function (e) {
    e.preventDefault();
    Session.set('openProfile', false);
  }
});
