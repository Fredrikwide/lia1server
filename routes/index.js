
const router = require('express').Router()
const reservation = require('./reservation')

//** GET */
router.get('/', (req, res) => {
    res.send({status: 'sucess'});
});


// "url/reservation" will get all reservation 
router.use('/reservation', reservation);


// "url/search" will search all reservation 
//router.use('/search', );

module.exports = router;