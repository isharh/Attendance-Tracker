Attendance = new Mongo.Collection( 'attendance' );

Attendance.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Attendance.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

AttendanceSchema = new SimpleSchema({
  'title': {
    type: String,
    allowedValues: ["Absent", "Present"]
  },
  'start': {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker',
        timezoneId: "Asia/Calcutta",
        dateTimePickerOptions: {
          pickDate: false
        }
      }
    }

  },
  'end': {
     type: String,
     optional: true,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker',
        timezoneId: "Asia/Calcutta",
        dateTimePickerOptions: {
          pickDate: false
        }
      }
    }
  },
  'allDay':{
    type: Boolean,
    optional: true
  },
  'backgroundColor': {
    type: String,
    optional: true
  }
  
});

Attendance.attachSchema(AttendanceSchema);

// ModalInputs = new Mongo.Collection("ModalInputs");

// ModalInputs.attachSchema(new SimpleSchema({
  

// }));