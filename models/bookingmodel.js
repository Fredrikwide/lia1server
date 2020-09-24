const mongoose = require('mongoose')

const Schema = mongoose.schema;

const reservationSchema = new Schema({
   name: {
       type: String,
       required: true,
       unique: true,
       trim: true,
       minlength: 2
   },
   email: {
       type: email,
       required: true,
       minlength: 6,
       trim: true
   },
   phone: {
        type: String,
        minlength: 10,
        maxlength: 12
   },
   date: {
       type: Date,
       default: Date.now
   },
   time: {
       type: String,
       firstTime: '18.00',
       lastTime: '21.00',
       required: true
   }
}, {
    timestamp: true
})

const bookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    startTime: {type:Number, required:true},
    endTime: {type:Number, required:true},
    clientName: {type:String, required:true}
    
});

const Booking = mongoose.model('Booking', bookingSchema);