const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");


router.post("/register", async (req, res) =>{
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
        res.send({
            status: 'sucsess',
            newUser
        })
    } catch {
        res.status(500).json({ error: err.message });
    }
})


router.post("/login", async (req, res) => {
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
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/tokenIsValid", async (req, res) => {
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
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id,
    });
});

module.exports = router;