// admin controller
const Reservation = require('../models/bookingmodel')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");


/**
 *  GET all reservation
 * 
 *  GET / 
 */
const index =  async (req, res) =>{
    Reservation.find()
    .then(reservations => {
        res.send({
            status: 'success',
            data: {
                reservations
            }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thrown when trying to get all reservation', err
        })
    })
}

/**
 *  GET a specific reservation
 * 
 *  GET /:id
 */
const show = async (req, res) =>{
    Reservation.findOne(getReservationFilter(req.params.reservation))
    .then(reservation => {
        if(!reservation){
            res.sendStatus(404);
            return;
        }
        res.send({
            status: 'success',
            data: {
                reservation
            }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thrown when trying to get a reservation', err
        })
    })
}

/**
 *  Create a reservation
 * 
 *  POST /:id
 */
const store = async (req, res) =>{
    const reservation = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: Date.parse(req.body.date),
        people: req.body.people,
        time: req.body.time
    }
    console.log('reservation done,', reservation)
    const newReservation = new Reservation({...reservation})

    newReservation.save()
    .then( reservation => {
        res.send({
            status: 'success',
            data: {
                reservation
            }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thrown when trying to create a reservation', err
        })
    })
    console.log(newReservation)
}

/**
 *  Update a specific reservation
 * 
 *  PUT /:id
 */
const update = async (req, res) =>{
    Reservation.findOneAndUpdate(getReservationFilter(req.params.reservation), req.body, {new:true})
    
    .then(reservation => {
        if(!reservation){
            res.sendStatus(404);
            return;
        }
        res.send({
            status: 'success',
            data: {
                reservation
            }
        })
    })
    .catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thrown when trying to update a reservation', err
        })
    })
}

/**
 *  Delete a reservation
 * 
 *  DELETE /:reservation
 */
const destroy = async (req, res) =>{
    Reservation.findOneAndDelete(getReservationFilter(req.params.reservation))
    .then(() => res.json('deleted reservation!'))
    .catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thorown when trying to delete a reservation'
        })
    })
}


/**
 * Create a new admin in DB 
 * 
 * POST / create
 */

 const create = async (req, res) =>{
    try{
        // the object that we creata a admin whit
        const {email, password, passwordCheck} = req.body

        // validate the data 

        //validate if evry field has data
        if (!email || !password || !passwordCheck ) {
            res.send({
                status: 'fail',
                data: {
                    message: "Please fill in all field"
                }
            })
        }
        // check the lencht of the password
        if (password.length < 5){
            res.send({
                status: 'fail',
                data: {
                    message: "The password must be at least 5 characters long"
                }
            })
        }

        // look if the password check and the password is the same
        if (password !== passwordCheck){
            res.send({
                status: 'fail',
                data: {
                    message: "Enter the same password twice for verification."
                }
            })
        } 

        // check if user alredy exist 
        const existingUser = await User.findOne({ email: email });
        if (existingUser){
            res.send({
                status: 'fail',
                data: {
                    message: "An account with this email already exists."
                }
            })
        }

        //creat a salted password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
        email,
        password: passwordHash,
        });

        // if evrything allright send the user to the frontend 
        const saveUser = await newUser.save()
        res.send({
            status: 'sucsess',
            saveUser
        })
    } catch (err) {
        res.status(500, {
            status: 'fail',
            data: {
                message: err
            }
        })

      }
 }

 /**
  * Login in admin
  * 
  * POST /login 
  */

 const login =  async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate
        if (!email || !password) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }

        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid password or username." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
 }


 /** 
  * Remove a admin
  * 
  * DELETE /delete
  */
 const remove = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
 }

 /**
  * Check if token is Valid 
  * 
  * POST / validToken
  */

const validToken = async (req, res) =>{
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const verified = async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.email,
        id: user._id,
    });
}

 
/**
 * Get movie filter
 *
 * If `reservation` is a hexadecimal string of exactly 24 characters,
 * then search the `_id` attribute.
 * Otherwise, assume `reservation` contains a slug and search the
 * `slug` attribute.
 */

const getReservationFilter = reservation =>{
    return (/^[0-9a-fA-F]{24}$/.test(reservation))
		? { _id: reservation }
		: { slug: reservation };
}


module.exports = {
	index,
	show,
	store,
	update,
    destroy,
    create,
    login,
    remove,
    validToken,
    verified,
}