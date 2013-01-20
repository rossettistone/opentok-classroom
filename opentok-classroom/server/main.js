Meteor.startup(function () {
  if (Documents.find().count() === 0) {
  Documents.insert({
    name: "Sample doc",
    text: "Write here..."
  });
  }
});
