const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');


//tell mongoose to use the slug package as a plugin
mongoose.plugin(slug);


const reservationSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        unique: false
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        unique: false
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
    slug: {
        type: String,
        slug: 'firstname',
        unique: true,
        slug_padding_size: 4,
    },
    gdpr: {
        type: Boolean,
        required: true
    },
    time: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})


reservationSchema.index({ createdAt: 1 }, { exppireAfterSeconds: 7862400 })

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;


