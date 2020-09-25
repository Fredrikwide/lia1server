const router = require('express').Router()
const Reservation = require('../models/bookingmodel.js')


router.route('/').get((req,res) => {
    Reservation.find()
    .then(reservations => res.json(reservations))
    .catch(err => res.status(400).json('Error: ', + err))
})

router.route('/add').post((req,res) => {
   const name = req.body.name
   const email = req.body.email
   const phone = req.body.phone
   const date = req.body.date
   const people = req.body.people
   const time = req.body.time
    
    const newReservation = new Reservation({name, email, phone, date, people, time})

    newReservation.save()
    .then(() => res.json('name added!'))
    .catch(err => res.status(400).json('Error: ' + err))


})

module.exports = router;