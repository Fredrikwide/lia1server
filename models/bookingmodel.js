const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
   name: {
       type: String,
       required: true,
       unique: true,
       trim: true,
       minlength: 2
   },
   email: {
       type: String,
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
   people: {
        type: Number,
        min: 1,
        max: 6,
   },
   time: {
       type: String,
       required: true
   }
}, {
    timestamps: true
})


const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;


