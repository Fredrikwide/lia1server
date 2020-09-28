// movie controller

const router = require('express').Router()
const Reservation = require('../models/bookingmodel')

/**
 *  GET all reservation
 * 
 *  GET / 
 */
const index = async (req, res) =>{
    console.log(req.params.id)
    Reservation.find()
    .then(reservations => {
        res.send({
            status: 'success',
            data: {
                reservations
            }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thorown when trying to get all reservation'
        })
    })
}


/**
 *  GET a specific reservation
 * 
 *  GET /:id
 */
const show = async (req, res) =>{
    Reservation.findById(req.params.id)
    .then(reservation => {
        if(!reservation){
            res.sendStatus(404);
            return;
        }
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
            message: 'Exception thorown when trying to get a reservation'
        })
    })
}

/**
 *  Create a reservation
 * 
 *  POST /:id
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
            message: 'Exception thorown when trying to create a reservation'
        })
    })
}

/**
 *  Update a specific reservation
 * 
 *  PUT /:id
 */
const update = async (req, res) =>{
    Reservation.findByIdAndUpdate(req.params.id, req.body, {new:true})
    
    .then(reservation => {
        if(!reservation){
            res.sendStatus(404);
            return;
        }
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
            message: 'Exception thorown when trying to update a reservation'
        })
    })
}

/**
 *  Delete a reservation
 * 
 *  DELETE /:id
 */
const destroy = async (req, res) =>{
    Reservation.findByIdAndDelete(req.params.id)
    .then(() => res.json('deleted reservation!'))
    .catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thorown when trying to delete a reservation'
        })
    })
}

const search = async (req, res) =>{

}


module.exports = {
    index,
    show,
    store,
    update,
    destroy
}