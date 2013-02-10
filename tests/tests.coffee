describe 'Meteor client-side code', ->

  dummyroom = 
    _id: 789

  beforeEach ->
    Session.set('roomClicked', 0);

  describe 'Template.classroom', ->

    describe '#activeRoom()', ->
      it 'should return true if the clicked room ID is the same as "this" room ID', ->
        Session.set('roomClicked', 789)
        chai.assert.equal(Template.classroom.activeRoom.apply(dummyroom), true)

      it 'should return false if the clicked room ID is different than "this" room ID', ->
        Session.set('roomClicked', 7890)
        chai.assert.equal(Template.classroom.activeRoom.apply(dummyroom), false)

  describe 'opentok', ->
    xit 'should create a unique session ID for each classroom', ->

    xit 'should add new students to an existing session', ->