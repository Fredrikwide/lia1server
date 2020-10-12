
/**
 * Admin routes
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller');
const authController = require('../controllers/auth_controller')


// auth 
const auth = require("../middleware/auth");

/* Get all reservation */
router.get('/reservation/', adminController.index);

/* Get a reservation by id */
router.get('/reservation/:id',  adminController.show);

/* Create a new reservation */
router.post('/reservation', adminController.store);

/* Update a reservation */
router.put('/reservation/:id',  adminController.update);

/* Delete a reservation */
router.delete('/reservation/:id', adminController.destroy);


// auth part

/** Creat a admin */
router.post("/create", authController.create);

/** Login */
router.post("/login", authController.login);

/** delete a admin */
router.delete("/delete", authController.remove);

/**check if a token is valid */
router.post("/validToken", authController.validToken);

/** When a user is verifide */
router.get("/", auth, authController.verified)

router.get("/:date", authController.today)


module.exports = router;