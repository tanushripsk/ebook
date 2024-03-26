const express = require('express')
const User = require('../modules/User')
const fetchuser = require('../fetch/Fetchuser')
const router = express.Router()
const { body, validationResult } = require('express-validator')
var bcryptjs = require('bcryptjs')
var jwt = require('jsonwebtoken')
const jwt_key = 'gayatrimam@123';

router.post('/createuser',
    [
        body('name', 'enter valid name').isLength({ min: 3 }),
        body('email', 'enter valid email').isEmail(),
        body('password', 'enter password has min length is 8').isLength({ min: 8 })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        }
        var user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false;
            return res.status(404).json({ error: "sorry already exist" })
        }
        const salt = await bcryptjs.genSalt(10);
        secPass = await bcryptjs.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, jwt_key);
        console.log(authtoken);
        success = true;
        res.json({success, authtoken})
    })

router.post('/login', [
    body('email', 'enter valid email').isEmail(),
    body('password', 'min length is 8').exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        }
        const { email, password } = req.body;
        try {
            var user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: 'sorry user not exist' });
            }
            const pass = await bcryptjs.compare(password, user.password);
            if (!pass) {
                success = false;
                return res.status(404).json({ error: 'sorry user not exist' })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, jwt_key);
            success = true;
            res.json({ success, authtoken });
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send('internal server error')
        }
    }
)

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId)
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(400).send('internal server error')
    }
})

module.exports = router