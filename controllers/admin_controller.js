// admin controller
const Reservation = require('../models/bookingmodel')
const models = require('../models');


/**
 *  GET all reservation
 * 
 *  GET / 
 */
const index =  async (req, res) =>{
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
            message: 'Exception thrown when trying to get all reservation', err
        })
    })
}

/**
 *  GET a specific reservation
 * 
 *  GET /:id
 */
const show = async (req, res) =>{
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
            message: 'Exception thrown when trying to get a reservation', err
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
        time: req.body.time,
        gdpr: req.body.gdpr,
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
            message: 'Exception thrown when trying to create a reservation', err
        })
    })
    console.log(newReservation)
}

/**
 *  Update a specific reservation
 * 
 *  PUT /:id
 */
const update = async (req, res) =>{
    
    Reservation.findByIdAndUpdate((req.params.id), req.body, {new:true})
    
    .then(reservation => {
        console.log(reservation)
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
            message: 'Exception thrown when trying to update a reservation', err
        })
    })
}

/**
 *  Delete a reservation
 * 
 *  DELETE /:reservation
 */
const destroy = async (req, res) =>{
    try {
        const reservation = await models.Reservation.findByIdAndDelete(req.params.id);
        console.log(reservation)

		if (!reservation) {
			return res.sendStatus(404);
		}

		return res.send({
			status: 'success',
			data: {
				reservation,
			}
		});

	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: error.message,
		});
	}
}




/**
 * Get reservation filter
 *
 * If `reservation` is a hexadecimal string of exactly 24 characters,
 * then search the `_id` attribute.
 * Otherwise, assume `reservation` contains a slug and search the
 * `slug` attribute.
 */

const getReservationFilter = reservation =>{
    return (/^[0-9a-fA-F]{24}$/.test(reservation))
		? { _id: reservation }
		: { slug: reservation };
}


module.exports = {
	index,
	show,
	store,
	update,
    destroy,
}