const router = require('express').Router()
const Reservation = require('../models/bookingmodel.js')


router.route('/').get((req,res) => {
    console.log(req.params.id)
    Reservation.find()
    .then(reservations => res.json(reservations))
    .catch(err => res.status(400).json('Error: ', + err))
})

router.route('/:id').get((req,res) => {
    Reservation.findById(req.params.id)
    .then(reservation => {
        res.json(reservation)
    })
    .catch(err => res.status(400).json(err))
})

router.route('/update/:id').post((req,res) => {
    Reservation.findByIdAndUpdate(req.params.id).then(reservation => {
        reservation.name = req.body.name
        reservation.email = req.body.email
        reservation.phone = req.body.phone
        reservation.date = Date.parse(req.body.date)
        reservation.people = req.body.people
        reservation.time = req.body.time

        reservation.save().then(() => res.json('reservation updated'))
        .catch(err => res.status(400).json('error updating reservation', + err))
    })
    .catch(err => res.status(400).json('error something wrong: ', + err))
})

router.route('/:id').delete((req,res) => {
    Reservation.findByIdAndDelete(req.params.id)
    .then(() => res.json('deleted reservation!'))
    .catch(err => res.status(400).json('error somehting wrong with deletion:', + err))
})

router.route('/add').post((req,res) => {
    const reservation = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: Date.parse(req.body.date),
        people: req.body.people,
        time: req.body.time
    }
    
    const newReservation = new Reservation({...reservation})

    newReservation.save()
    .then(() => res.json('reservation added!'))
    .catch(err => res.status(400).json('Error: ' + err))


})

module.exports = router;