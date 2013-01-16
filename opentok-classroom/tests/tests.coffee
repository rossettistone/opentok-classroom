# Test the client in this example
Meteor = {
  'is_client': true,
  'is_server': false
};

# Create a dummy 'hello' template object
Template = {
  'hello': {}
};

# Stub the console.log() function so we can check what it's called with
# sinon.stub(console, 'log');

describe 'Meteor client-side code', ->

  describe 'Template.chatlogs', ->

    describe '#chatMessages()', ->
      it 'should return an array (of chat messages)', ->
        chai.assert.equal(Array.isArray(Template.chatlogs.chatMessages()), true);
      
    describe '#events', ->
      it 'should contain a click handler for the input button', ->
        chai.assert.property(Template.hello.events, 'click input');
      

      it 'the input button event handler should log a message to the console', ->
        Template.hello.events['click input']();

        chai.assert(console.log.calledWith('You pressed the button'));
      
    

  

