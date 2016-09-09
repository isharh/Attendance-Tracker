import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.startup(() => {
  // code to run on server at startup

if (Meteor.isServer) {
  Meteor.publish("attendance", function(){
     return Attendance.find({})
  });
   Meteor.startup(function() {

    return Meteor.methods({

      removeAllPosts: function() {

        return Attendance.remove({});

      }

    });

  });

}

  
});


