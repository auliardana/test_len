const express = require("express");
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const router =  express.Router();

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const userWithEmail= await User.findOne({ where : {email} }).catch((err) => {
        console.log("Error: ", err)
    });

    // if(!userWithEmail) return res. json({ message: "incorrect email or password" });
    // if(userWithEmail.password !== password) return res.json({ message: "Incorrect email or password"});

    if (!userWithEmail || userWithEmail.password !== password) {
        return res.json({ message: "Incorrect email or password" });
      }
    
    const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email}, process.env.JWT_SECRET);
    res.json( {message: "welcome to the club!", Username:userWithEmail.username, token: jwtToken})


}); 

module.exports = router ;