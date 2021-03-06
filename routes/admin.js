
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
router.get('/reservation/', auth, adminController.index);

/* Get a reservation by id */
router.get('/reservation/:id', auth,  adminController.show);

/* Update a reservation */
router.put('/reservation/:id', auth, adminController.update);

/* Delete a reservation */
router.delete('/reservation/:id', auth, adminController.destroy);


// auth part

/** Creat a admin */
router.post("/create", authController.create);

/** Login */
router.post("/login", authController.login);

/** delete a admin */
router.delete("/delete", auth, authController.remove);

/**check if a token is valid */
router.post("/validToken", authController.validToken);

/** When a user is verifide */
router.get("/", auth, authController.verified)

router.get("/:date", auth, authController.today)


module.exports = router;