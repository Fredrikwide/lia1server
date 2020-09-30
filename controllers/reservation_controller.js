// movie controller

//const models = require('../models');
const Reservation = require('../models/bookingmodel')


/**
 *  Create a reservation
 * 
 *  POST /:reservation
 */
const store = async (req, res) =>{
    const reservation = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: Date.parse(req.body.date),
        people: req.body.people,
        time: req.body.time
    }
    console.log('reservation done,', reservation)
    const newReservation = new Reservation({...reservation})

    newReservation.save()
    .then( reservation => {
        res.send({
            status: 'success',
            data: {
                reservation
            }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thorown when trying to create a reservation', err
        })
    })
    console.log(newReservation)
}

module.exports = {
    store,
}