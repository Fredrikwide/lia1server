// movie controller

//const models = require('../models');
const Reservation = require('../models/bookingmodel')
const moment = require('moment');


const AVAILABLE_TABLE = 15
const MAX_RESERVATION = 15


/**
 * Look for available time 2020-09-30T18:00:00.000+00:00
 */


 const avabileTime = async (req, res) =>{

    Reservation.find({
        "date": moment(req.date).format('YYYY-MM-DD'),
        "time": req.time
    })
    .then(reservation =>{
        if(reservation.length !== MAX_RESERVATION) {
            console.log('det finns ledig tid')
            return true
    
       }
        else{
            console.log('det finns tyvärr inte ledig tid')   
            return false
                
        }
    }).catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thrown when trying to find table at:' + req.params.date
        })
    })
 }

 // first look if time avilable
const availableTable = async (req, res) =>{
    Reservation.find({
        "date": req.params.date,
    })
    .then(reservations => {
        //18.00
        const firstTime = []
        //21.00
        const lastTime = []
 
        // check if the reservation is 18.00 or 21.00
        reservations.filter( reservation => {
            if(reservation.time === "18:00"){
                firstTime.push(reservation)
                
            } else {
                lastTime.push(reservation)
            }
        })
        
        if(firstTime.length < AVAILABLE_TABLE || lastTime.length < AVAILABLE_TABLE ) {
            res.send({
                status: 'success',
                data: {
                    "available": true,
                    "message": 'This is our bookeble tables this date',
                    "avilable_18": AVAILABLE_TABLE - firstTime.length,
                    "avilable_21": AVAILABLE_TABLE - lastTime.length
                }
            })
        } else{
            res.send({
                status: 'fail',
                data:{
                    "available": false,
                    "message": 'no availvle table at this day',
                    "avilable_18": AVAILABLE_TABLE - firstTime.length,
                    "avilable_21": AVAILABLE_TABLE - lastTime.length
                }
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
        people: req.body.people,
        time: req.body.time,
        gdpr: req.body.gdpr,
    }
    
   avabileTime(reservation)
    
    console.log('this is lookIfAvabileTime', avabileTime(reservation))
    if (avabileTime){
        console.log('jag kör detta för lookIfAvabileTime är true')
    }

    console.log('reservation done,', reservation)
    const newReservation = new Reservation({ ...reservation })

    newReservation.save()
        .then(async reservation => {        
            await res.send({
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
    availableTable,
    store,
    avabileTime,
}