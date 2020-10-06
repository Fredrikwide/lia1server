
const express = require('express');
const router = express.Router();


//** GET */
router.get('/', (req, res) => {
    res.send({status: 'sucess'});
});


// "url/reservation" will get the function book a table and show if its any avibile table
router.use('/reservation', require('./reservation'));
router.use('/admin', require('./admin'));

// will be removd
router.use('/login', require('./userRoutes'))


module.exports = router; 