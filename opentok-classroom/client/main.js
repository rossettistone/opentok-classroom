if (Meteor.isClient) {
  Template.container.greeting = function () {
    return "Welcome to opentok-classroom.";
  };

  // Template.container.events({
  //   'click input' : function () {
  //     // template data, if any, is available in 'this'
  //     if (typeof console !== 'undefined')
  //       console.log("You pressed the button");
  //   }
  // });
}
