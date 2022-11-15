const express = require('express');

const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//resgister
router.post("/", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(404).send("All input is required");
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User already exist. Please Login")
        }

        //encrypt password
        encryptedPassword = await bcrypt.hash(password, 10);

        //create user in database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        //token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );

        user.token = token

        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;