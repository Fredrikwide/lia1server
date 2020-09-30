
/**
 * Admin routes
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');

/* Get all movies */
router.get('/reservation/', adminController.index);

/* Get a movie */
router.get('/reservation/:id', adminController.show);

/* Create a new movie */
router.post('/reservation', adminController.store);

/* Update a movie */
router.put('/reservation/:id', adminController.update);

/* Delete a movie */
router.delete('/reservation/:id', adminController.destroy);

module.exports = router;