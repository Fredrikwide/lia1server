
/**
 * Admin routes
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');

// auth 
const auth = require("../middleware/auth");

/* Get all reservation */
router.get('/reservation/', auth, adminController.index);

/* Get a reservation by id */
router.get('/reservation/:id', auth,  adminController.show);

/* Create a new reservation */
router.post('/reservation', auth, adminController.store);

/* Update a reservation */
router.put('/reservation/:id',auth,  adminController.update);

/* Delete a reservation */
router.delete('/reservation/:id', auth, adminController.destroy);


// auth part

/** Creat a admin */
router.post("/create", adminController.create);

/** Login */
router.post("/login", adminController.login);

/** delete a admin */
router.delete("/delete", auth, adminController.remove);

/**check if a token is valid */
router.post("/validToken", adminController.validToken);

/** When a user is verifide */
router.get("/", auth, adminController.verified)


module.exports = router;