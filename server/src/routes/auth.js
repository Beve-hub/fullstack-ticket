const {Router} = require('express');
const User = require('../models/User');
const {hashPassword, comparePasswords} = require('../utils/helper');
const generateCode = require('../utils/otp');
const {sendVerifiedEmail} = require('../utils/nodemailer')

const router = Router();


// Register a new user
router.post('/register',  async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Check if user already exists
        const user = await User.findOne({email});
        if (user) { 
            
            res.status(400).json({message: 'User already exists'})
        } else {
            const hashedPassword = hashPassword(password);
           const newUser = new User({name, email, password: hashedPassword });
           await newUser.save();
           res.json({message: 'User registered successfully'});
        }

        
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
});

// Login a user
router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}); //check if user already
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        } else {
            // compared password
            const isMatch = comparePasswords(password, user.password);
            if (!isMatch) {
                return res.status(400).json({message: 'Invalid password'});
            }
        }
        
     
        res.json({message: 'User logged in successfully'});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
}) 

// send verification email
router.post('/verification', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Generate a 6-digit code and save it temporarily in the user
        const verificationCode = true;
        user.verificationCode = verificationCode;
        await user.save();

        await sendVerifiedEmail(email, verificationCode);

        res.status(200).json({ message: 'Verification Code sent to email' });
    } catch (error) {
        console.error('Error sending verification code:', error);
        res.status(500).json({ message: 'Error sending verification code' });
    }
});


// Verify the 6-digit code
router.post('/verify', async (req, res) => {
    try {
        const {email, code} = req.body;

        // Find the user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        //check if the code matches
        if (user.verificationCode !== code) {
            return res.status(400).json({message: 'Invalid verification code'});
        }

        // Update the user's status to verified
        user.isVerified = true;
        user.verificationCode = null;
        await user.save();

        res.status(200).json({message: 'User verified successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error verifying code'})
    }
}) 

 
module.exports = router;