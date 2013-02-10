Opentok Classroom
=================

An online classroom environment for teaching and tutoring remotely. Includes:
* Collaborative documents: Students and teachers can create and simultaneously edit text files. These are saved as part of the classroom, so subsequent class sessions can use the same files.
* Video chat: Built-in video chat makes student-teacher interaction feel natural. As long as they have a webcam, users are logged into a video session automatically upon entering a classroom.

### Installation ###

First, you'll need to install Meteor:

    curl https://install.meteor.com | /bin/sh
  
If you encounter problems, refer to www.meteor.com.

You'll also need Meteorite, a community-developed package manager for Meteor. This can be installed easily using npm:

    npm install -g meteorite

Clone the repo to an empty directory, then start the Meteor server by typing:

    mrt

(This is actually the Meteorite command, but mrt commands are generally thin wrappers around the original 'meteor' commands).

### Running the Tests ###

Tests have been implemented with meteor-mocha-web. To view the tests, start the server by typing:
    $ METEOR_MOCHA_TEST_DIR=tests mrt
    
You can then view the tests by going to `localhost:3000/tests`

N.B. It is not recommended to develop with the server in testing mode, as the mocha.css file will cause styling changes throughout the whole site. This is a limitation of the meteor-mocha-web package. For now, only run testing mode when you intend to view the tests.

### Usage ###

Teachers and students have slightly different controls throughout the site. Generally speaking, teachers are able to create and destroy things (rooms, documents), while students can only read and edit.

All users are given the 'student' role upon account creation. This can be freely changed to 'teacher' in the Profile settings, accessible through the top navbar.

### Under the Hood ###

Planning to add some features of your own? Checkout DEVELOPERS.md before you start!

##### Video

Built with the OpenTok API.

At present, all users are logged into a single chat session. As a result, using multiple classrooms at the same time will cause all students and teachers to see and hear each other.

##### Collaborative Documents

Meteor is inherently 'reactive', meaning that updates to databases or other stored variables are rapidly propagated to the server and all clients, and templates are rerendered based on these changes. Each time a user finishes pressing a key (i.e. 'keyup' event), the contents of the document is saved to a client-side database. Meteor then takes care of pushing those changes to the server and distributing them to other clients.

Because this approach does not involve operational transforms, it may be possible for users to run into problems if editing the exact same piece of text at the same moment.

Documents are stored on a per-room basis, and are persistently saved in a server-side database.

### Credits ###

* Reactive Documents: skalb - http://www.skalb.com/2012/04/16/creating-a-document-sharing-site-with-meteor-js/
* Stock Photography: jaylopez - http://www.sxc.hu/profile/jaylopez
