/**
 * Reservation router
 * 
 */


 const router = require('express').Router()
 const reservationController = require('../controllers/reservation_controller')

 //** Get all reservation */
 router.get('/', reservationController.index)

 //** Get a reservation */
 router.get('/:reservation', reservationController.show)

 //** Create a new reservation */
 router.post('/', reservationController.store)

 //** Update a reservation */
 router.put('/:reservation', reservationController.update)

 //** Delete a reservation */
 router.delete('/:reservation', reservationController.destroy)


 module.exports = router;