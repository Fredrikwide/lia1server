
const router = require('express').Router()
const reservationRouter = require('./reservation')

//** GET */

router.get('/', (req, res) => {
    res.send({status: 'sucess'});
});

router.use('/reservation', reservationRouter);

module.exports = router;