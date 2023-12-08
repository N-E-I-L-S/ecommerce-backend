const express = require("express")
const router = express.Router()
const Users = require("../models/users")
const authenticateUser = require('../middleware/Authmiddleware');

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res) => {
    try {
        const email = req.body.email;
        const existinguser = Users.findOne({ email });
        if (!existinguser) {
            if (req.body.password) {
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.password, salt);

                const newUser = new Users({
                    email: req.body.email,
                    password: hashedPassword
                })

                await newUser.save();
                res.status(201).json('New User Created');
            } else {
                res.status(403).json('please provide a password');
            }
        }
        else {
            res.status(403).json('User already exists');
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}
)

router.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(400).json('no user found');
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json('wrong password');
        }

        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, "neil", { expiresIn: '1d' });
        res.cookie('access_token', token, {
            httpOnly: true
        }).status(200).json({
            email: user.email
        })
    } catch (err) {
        res.status(500).json(err.message);
    }
}
)

router.post('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json('Logout success')
}
)


router.get('/getuser', authenticateUser, async (req, res) => {
    
    try {
      const user = await Users.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving user details' });
    }
  });
router.put('/addaddress', async (req, res) => {
    try {
        const { email, address } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.address = address;
        user.addressadded = true
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error adding address' });
    }
});


module.exports = router