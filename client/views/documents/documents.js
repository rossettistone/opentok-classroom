Template.documentList.documents = function () {
  return Documents.find({classroom: this._id}, {sort: {name: 1}});
};

Template.documentList.events({
  'click #new-document': function (e) {
    var name = $('#new-document-name').val();
    if (name) {
      Documents.insert({
        classroom: this._id,
        name: name,
        text: ""
      });
    }
  }
});

Template.document.events({
  'click #delete-document': function (e) {
    return Documents.remove(this._id);
  },
  'click #edit-document': function (e) {
    Session.set('document_id', this._id);
  }
});

Template.document.selected = function () {
  if (Session.equals("document_id", this._id)) {
    return "selected";
  } else {
    return "";
  }
};

Template.documentView.selectedDocument = function () {
  var document_id = Session.get("document_id");
  var selected = Documents.findOne({_id: document_id});
  if (selected) {
    $('#document-text').val(selected.text);
    return selected;
  }
};

Template.documentView.events({
  'keyup #document-text': function (e) {
    var sel = {_id: Session.get("document_id")};
    var mod = {$set: {text: $('#document-text').val()}};
    Documents.update(sel, mod);
  }
});
