const express = require('express')
const router = express.Router()
const User = require('../model/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "MynameisAbhishekMaurya$#"


router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({
                // name: "Abhishek",
                // password: "123456",
                // email: "abhi@gmail.com",
                // location: "vishal Enclave"

                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })

            res.json({ success: true })

        } catch (error) {

            console.log(error)
            res.json({ success: false })
        }

    })


router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })]
    , async (req, res) => {

        // console.log(req.body.password)

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                res.status(400).json({ errors: "Try logging with correct credentials" });

            }
            // console.log(userData)

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)

            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging with correct password" })

            }

            const data = {
                user: {
                    id: userData.id
                }

            }

            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken:authToken })

        } catch (error) {

            console.log(error)
            res.json({ success: false })
        }

    })

module.exports = router;


