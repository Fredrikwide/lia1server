/**
 * Reservation router
 * 
 */


 const router = require('express').Router()
 const reservationController = require('../controllers/reservation_controller')



 //** Create a new reservation  on frontend */
 router.post('/', reservationController.store)



 module.exports = router;