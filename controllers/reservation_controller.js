// movie controller

//const models = require('../models');
const Reservation = require('../models/bookingmodel')


const AVAILABLE_TABLE = 15

/**
 * Look for available time 2020-09-30T18:00:00.000+00:00
 */


const availableTable = async (req, res) => {
    Reservation.find({
        "date": req.params.date,
    })
        .then(reservations => {
            console.log('we have', reservations.length, 'reservation at this time')
            if (reservations.length < AVAILABLE_TABLE) {
                res.send({
                    status: 'success',
                    data: {
                        "avilable_table": AVAILABLE_TABLE - reservations.length
                    }
                })
            } else {
                res.send({
                    status: 'fail',
                    message: 'no availvle table at this time'
                })
            }
        }).catch(err => {
            res.status(500).send({
                status: 'fail',
                message: 'Exception thrown when trying to find table at:' + req.params.date
            })
        })
}


/**
 *  Create a reservation
 * 
 *  POST /:reservation
 */
const store = async (req, res) => {
    const reservation = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        date: Date.parse(req.body.date),
        people: req.body.seats,
        time: req.body.time
    }
    console.log('reservation done,', reservation)
    const newReservation = new Reservation({ ...reservation })

    newReservation.save()
        .then(async reservation => {
            await res.send({
                status: 'success',
                data: {
                    ...reservation
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
    availableTable,
    store,
}