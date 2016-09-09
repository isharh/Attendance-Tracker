
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.registerHelper('timeFormat', function(date, format) { 
  return moment(new Date(date)).format(format);
});

Template.registerHelper('timeFormat2', function(date, format) { 
   tempVar2= addMinutes(date, 330);
  return moment(new Date(tempVar2)).format(format);
});


Meteor.startup(function () {
  Session.setDefault("templateName", "calendar")
});

Template.body.helpers({
  template_name: function(){
    return Session.get("templateName")
  }
});

Template.body.events({
  "click .calendar": function() {
    Session.set("templateName", "calendar");
  },
  "click .log": function() {
     Session.set("templateName", "log");
  }
});

Meteor.subscribe('attendance')

  Template.calendar.rendered = function () {
    calendar = $('#calendar').fullCalendar({
        editable: true,
        selectable: true,
        events: function (start, end, timezone, callback) {
            var events = [];
            calEvents = Attendance.find();
            calEvents.forEach(function (evt) {
            events.push({
                id: evt._id,
                title: evt.title,
                start: evt.start,
                end: evt.end,
                backgroundColor: evt.backgroundColor
                });
        });
              callback(events);
},

        dayClick: function(date){
            $('#fullCalModal').modal();
            $('#submitButton').on('click',function(){

            var newTitle = AutoForm.getFieldValue("title","ModalInputsForm");
            var newStart = AutoForm.getFieldValue("start","ModalInputsForm");
            var newEnd =   AutoForm.getFieldValue("end","ModalInputsForm");

            dateTimeString = adjustDate(date,newStart);
            dateTimeString2 = adjustDate(date,newEnd);  
            dateTimeString3 = addMinutes(dateTimeString,-330) ;
            dateTimeString4 = addMinutes(dateTimeString2,-330) ;
            dateAdj = addMinutes(date,-330) ;
            
            if(typeof newStart=="undefined"){
                newStart2 = new Date(dateAdj);
            }
            else{
                newStart2=new Date(dateTimeString3);
            };
            if(typeof newEnd=="undefined"){
                newEnd2 = new Date(newStart2);
            }
            else{
                newEnd2=new Date(dateTimeString4);
            };
            if(newTitle=="Present"){
                coloroption = "Green";
            }
            else if (newTitle=="Absent"){
                coloroption="Red";
            };

            if(newEnd2<newStart2){
                alert("*** !!! End time cannot be less than start time !!! ***")
            }
            else
            {
                var iso1 = new Date(newStart2.toISOString());
                var iso2 = new Date(newEnd2.toISOString());
            Attendance.insert({
            title: newTitle,
            start: iso1,
            end: iso2,
            allDay: true,
            backgroundColor: coloroption
            });

            $('#submitButton').unbind('click').click(function() {});
            $('#fullCalModal').modal('hide');
        };
    });
},            
}).data().fullCalendar

        Tracker.autorun(function(){
            allReqsCursor = Attendance.find().fetch();
            if(calendar) calendar.refetchEvents();
        });
};

Template.log.helpers({
    all_items:function(){
        
        return Attendance.find();   

        Tracker.autorun(function(){
            allReqsCursor = Attendance.find().fetch();
            if(calendar) calendar.refetchEvents();
            
        });
    },
    p_items: function () {
         return Attendance.find({"title": "Present"}).count();
            },
  a_items: function () {
        return Attendance.find({"title": "Absent"}).count();
            }
});

var updateCalendar = function(){
    $('#calendar').fullCalendar( 'refetchEvents' );
}

function addMinutes(date, minutes) {
    tempVar=new Date(date);
    return new Date(tempVar.getTime() + minutes*60000);
    delete tempVar;
};

function adjustDate(a,b){
    datepart=new Date(a);
    timepart=new Date(b);
    var month = datepart.getMonth()+1;
    var day = datepart.getDate();
    var year = datepart.getFullYear();
    var hour = timepart.getHours();
    if (hour < 10)
        hour = "0"+hour;
    var min = timepart.getMinutes();
    if (min < 10)
        min = "0"+min;
    var sec = timepart.getSeconds();
    if (sec < 10)
        sec = "0"+sec;
    return month+'/'+day+'/'+year+' '+hour+':'+min+':'+sec;
    };

