### Great Ideas ###

##### Login Alternatives

Meteor has outstanding native integration with Facebook, Google, Twitter, and Github. Installing these is as simple as:

    meteor add accounts-facebook
    meteor add accounts-google
    ...



### Not-As-Great Ideas ###

##### Alternative Collaborative Documents

Feature-rich collaborative text editors like EtherPad or CodeMirror look like tempting options for replacing the Meteor-based collaborative documents included in this repo.

Unfortunately, adding these libraries to Meteor can cause considerable problems. Specifically, the reactive nature of these libraries has the potential to confuse Meteor's reactive updating, causing constant redraws and/or duplications of DOM elements and entire templates. These problems are likely solvable, perhaps by isolating the third-party code in an <iframe>, but embark on this mission with caution.
