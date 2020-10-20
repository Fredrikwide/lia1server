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
    Reservation.findOne(req.params.reservation)
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
 *  Update a specific reservation
 * 
 *  PUT /:id
 */
const update = async (req, res) => {
    try{
        const reservation = await models.Reservation.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
        );
        
        if (!reservation) {
			return res.sendStatus(404);
		}

		return res.send({
			status: 'success',
			data: {
				reservation,
			}
		});

    } catch (error){
        return res.status(500).send({
			status: 'error',
			message: error.message,
		});
    }
}  

/**
 *  Delete a reservation
 * 
 *  DELETE /:reservation
 */
const destroy = async (req, res) =>{
    try {
        const reservation = await models.Reservation.findByIdAndDelete(req.params.id);

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



module.exports = {
	index,
    show,
	update,
    destroy,
}