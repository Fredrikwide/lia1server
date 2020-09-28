/**
 * Reservation router
 * 
 */


 const router = require('express').Router()
 const reservationController = require('../controllers/reservation_controller')

 //** Get all reservation */
 router.get('/', reservationController.index)

 //** Get a reservation */
 router.get('/:id', reservationController.show)

 //** Create a new reservation */
 router.post('/', reservationController.store)

 //** Update a reservation */
 router.put('/:id', reservationController.update)

 //** Delete a reservation */
 router.delete('/:id', reservationController.destroy)

 //** Fin a reservation by date */
 router.delete('/date', reservationController.date)

 module.exports = router;