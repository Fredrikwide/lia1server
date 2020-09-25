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
   peaple: {
        type: Number,
        min: 1,
        max: 6,
   },
   time: {
       type: String,
       required: true
   }
}, {
    timestamp: true
})


const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;


