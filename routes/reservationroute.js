const router = require('express').Router()
const Reservation = requie('../models/bookingmodel.js')


router.route('/').get((req,res) => {
    Reservation.find()
    .then(reservations => res.json(reservations))
    .catch(err => res.status(400).json('Error: ', + err))
})

router.route('/add').post((req,res) => {
    const name = req.body.name;

    const newReservation = new Reservation({name})

    newReservation.save()
    .then(() => res.json('name added!'))
    .catch(err => res.status(400).json('Error: ' + err))


})

module.exports = router;