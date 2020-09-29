// movie controller

//const models = require('../models');
const Reservation = require('../models/bookingmodel')

/**
 *  GET all reservation
 * 
 *  GET / 
 */
const index = async (req, res) =>{
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
            message: 'Exception thorown when trying to get all reservation', err
        })
    })
}


/**
 * Search for movies
 */
const search = async (req, res) => {
	console.log("Want to search for:", req.query.q);
	res.send({ status: 'success' });
}



/**
 *  GET a specific reservation
 * 
 *  GET /:reservation
 */
const show = async (req, res) =>{
    //Reservation.findOne({slug: req.params.reservation})
    Reservation.findOne(getReservationFilter(req.params.reservation))
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
            message: 'Exception thorown when trying to get a reservation', err
        })
    })
}

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

/**
 *  Update a specific reservation
 * 
 *  PUT /:reservation
 */
const update = async (req, res) =>{
    Reservation.findOneAndUpdate(getReservationFilter(req.params.reservation), req.body, {new:true})
    
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
            message: 'Exception thorown when trying to update a reservation', err
        })
    })
}

/**
 *  Delete a reservation
 * 
 *  DELETE /:reservation
 */
const destroy = async (req, res) =>{
    Reservation.findOneAndDelete(getReservationFilter(req.params.reservation))
    .then(() => res.json('deleted reservation!'))
    .catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thorown when trying to delete a reservation'
        })
    })
}


/**
 * Get movie filter
 *
 * If `movie` is a hexadecimal string of exactly 24 characters,
 * then search the `_id` attribute.
 * Otherwise, assume `movie` contains a slug and search the
 * `slug` attribute.
 */

const getReservationFilter = reservation =>{
    return (/^[0-9a-fA-F]{24}$/.test(reservation))
		? { _id: reservation }
		: { slug: reservation };
}


module.exports = {
    index,
    search,
    show,
    store,
    update,
    destroy
}