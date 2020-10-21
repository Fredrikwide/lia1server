// movie controller

//const models = require('../models');
const Reservation = require('../models/bookingmodel')
const moment = require('moment');
const models = require('../models');

const AVAILABLE_TABLE = 15
const MAX_RESERVATION = 15



const timeHasPassed = async (date, time) => {
    try {
        //2020-10-19T13:36:02+00:00
        const convertedTime = Date.parse(`${date}T${time}:00+02:00`)

        // if time has passed return false
        if (Date.now() > convertedTime) {
            return false

        }
        // if time has not passed return false
        else {
            return true
        }
    } catch (error) {
        res.status(500).send({
            status: 'fail',
            message: error
        })
    }
}

// function that check if available times
const areTablesFree = async (date, time) => {
    try {
        const ourReservation = await models.Reservation.find({
            "date": date,
            "time": time
        })

        if (ourReservation.length < MAX_RESERVATION) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        res.status(500).send({
            status: 'fail',
            message: error
        })
    }
}


// first look if time avilable
const availableTable = async (req, res) => {
    Reservation.find({
        "date": req.params.date,
    })
        .then(reservations => {
            //18.00
            const firstTime = []
            //21.00
            const lastTime = []

            // check if the reservation is 18.00 or 21.00
            reservations.filter(reservation => {
                if (reservation.time === "18:00") {
                    firstTime.push(reservation)

                } else {
                    lastTime.push(reservation)
                }
            })

            if (firstTime.length < AVAILABLE_TABLE || lastTime.length < AVAILABLE_TABLE) {
                res.send({
                    status: 'success',
                    data: {
                        available: true,
                        message: 'This is our bookeble tables this date',
                        first: AVAILABLE_TABLE - firstTime.length,
                        last: AVAILABLE_TABLE - lastTime.length
                    }
                })
                    } else {
                        res.send({
                            status: 'fail',
                            data: {
                                message: 'no available table at this day',
                                available: false,
                                first: AVAILABLE_TABLE - firstTime.length,
                                last: AVAILABLE_TABLE - lastTime.length

                            }
                        })
                    }
        }).catch(err => {
            res.status(500).send({
                status: 'fail',
                data: {
                    available: false,
                    message: 'no availvle table at this day',
                    first: AVAILABLE_TABLE - firstTime.length,
                    last: AVAILABLE_TABLE - lastTime.length
                }
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
        date: req.body.date,
        people: req.body.people,
        time: req.body.time,
        gdpr: req.body.gdpr,
    }
    const time = await timeHasPassed(reservation.date, reservation.time)

    // check if time has passed
    if (!time) {
        res.send({
            status: 'fail',
            data: {
                message: "Sorry, time has passed"
            }
        })
    }


    const lookIfAvailableTime = await areTablesFree(reservation.date, reservation.time)

    // if not Available Time return fail and 
    if (!lookIfAvailableTime) {
        res.send({
            status: 'fail',
            data: {
                message: "Sorry, this time is fully booked, try another time"
            }
        })
    } else {
        console.log('reservation done,', reservation)
        const newReservation = new Reservation({ ...reservation })
        // save the data to DB
        newReservation.save()
            .then(async reservation => {
                await res.send({
                    status: 'success',
                    data: {
                        reservation
                    }
                })
            }).catch(err => {
                res.status(500).send({
                    status: 'fail',
                    message: 'Exception thorown when trying to create a reservation', err
                })
            })
    }
}

module.exports = {
    availableTable,
    store,
}