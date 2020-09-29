const mongoose = require('mongoose');

// Set up the models we want to use in our app
const models = {};
models.Reservation = require('./bookingmodel');


module.exports = {
	mongoose,
	...models,
}