const mongoose = require('mongoose');
const slug  = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

//tell mongoose to use the slug package as a plugin
mongoose.plugin(slug);

const reservationSchema = new Schema({
   name: {
       type: String,
       required: true,
       trim: true,
       minlength: 2
   },
   slug: {
        type: String,
        slug: 'name',
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
       default: Date.now(),
       require: true
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


