/**
 * Reservation router
 * 
 */


 const router = require('express').Router()
 const reservationController = require('../controllers/reservation_controller')



 //** Create a new reservation  on frontend */
 router.post('/', reservationController.store)
 router.get('/:date', reservationController.availableTable)
 router.get('/:date/:time', reservationController.avabileTime)




 module.exports = router;