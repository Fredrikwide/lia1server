// movie controller


/**
 *  GET all reservation
 * 
 *  GET / 
 */
const index = async (req, res) =>{
    res.status(405).send({status: 'fail', message:'Method not implamented'});
}


/**
 *  GET a specific reservation
 * 
 *  GET /:id
 */
const show = async (req, res) =>{
    res.status(405).send({status: 'fail', message:'Method not implamented'});
}

/**
 *  Create a reservation
 * 
 *  POST /:id
 */
const store = async (req, res) =>{
    res.status(405).send({status: 'fail', message:'Method not implamented'});
}

/**
 *  Update a specific reservation
 * 
 *  PUT /:id
 */
const update = async (req, res) =>{
    res.status(405).send({status: 'fail', message:'Method not implamented'});
}

/**
 *  Delete a reservation
 * 
 *  DELETE /:id
 */
const destroy = async (req, res) =>{
    res.status(405).send({status: 'fail', message:'Method not implamented'});
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
}