describe 'Meteor client-side code', ->

  describe 'Template.classroom', ->

    describe '#activeRoom()', ->
      it 'should return the id of the room name clicked', ->
        dummyroom =
          _id: 789
        chai.assert.equal(Template.classroom.activeRoom.apply(dummyroom), false);

      it 'should', ->
        dummyroom = 
          _id: 789
        Session.set('roomClicked', 7890);
        chai.assert.equal(Template.classroom.activeRoom.apply(dummyroom), true);