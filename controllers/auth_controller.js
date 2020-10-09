// admin controller
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Reservation = require('../models/bookingmodel')


/**
 * Create a new admin in DB 
 * 
 * POST / create
 */

const create = async (req, res) => {
    try {
        // the object that we creata a admin whit
        const { email, password, passwordCheck } = req.body

        // validate the data 

        //validate if evry field has data
        if (!email || !password || !passwordCheck) {
            res.send({
                status: 'fail',
                data: {
                    message: "Please fill in all field"
                }
            })
        }
        // check the lencht of the password
        if (password.length < 5) {
            res.send({
                status: 'fail',
                data: {
                    message: "The password must be at least 5 characters long"
                }
            })
        }

        // look if the password check and the password is the same
        if (password !== passwordCheck) {
            res.send({
                status: 'fail',
                data: {
                    message: "Enter the same password twice for verification."
                }
            })
        }

        // check if user alredy exist 
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
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

const login = async (req, res) => {
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

const validToken = async (req, res) => {
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
    try {
        const user = await User.findById(req.user);
        res.json({
            email: user.email,
            id: user._id,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

}


/** Get todays reservation
 * 
 * GET / ADMIN/:date
 */
const today = async (req, res) => {
    Reservation.find({
        "date": req.params.date,
    }).then(reservation => {
        console.log('this is todays reservation', reservation)
        res.send({
            status: 'success',
            data: {
                reservation
            }
        })
    }).catch(err => {
        res.status(500).send({
            status: 'fail',
            message: 'Exception thrown when trying to get a reservation', err
        })
    })
}

module.exports = {
    create,
    login,
    remove,
    validToken,
    //verified,
    today,
}