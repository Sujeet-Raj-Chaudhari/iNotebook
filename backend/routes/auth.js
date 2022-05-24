const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = "SujeetIsgoodBoy";

//ROUTE 1: Create a User using : POST"/api/auth/createUser". Doesn't require Auth

router.post('/createUser', [ 
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast of length 5').isLength({min: 5}),
], async (req, res)=>{
    //If there are errors request Bad Request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    //Check whether the user with this email exists already
    try
    {
        let user = await User.findOne({email: req.body.email})
        if(user)
        {
            return res.status(400).json({error: "Sorry a user with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);



        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user:{
               id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
    //res.json(user);
    res.json({authToken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Seome error occured");
    }
    
})


//ROUTE 2: Authenticate a User Using POST:"/api/auth/login", No Login Required

router.post('/login', [ 
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can\'t be null').exists()
], async (req, res) => {
    
    //if there are errors, return the bad request and the error

    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        
        if(!user)
        {
            return res.status(400).json({error: 'Please try to login with correct credentials'});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare)
        {
            return res.status(400).json({error: 'Please try to login with correct credentials'});
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})


//ROUTE 3: Get Loggedin User details using: POST"/api/auth/getuser", Login required

router.post('/getuser', fetchUser,  async (req, res) =>{
    
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("password")

        res.send({user});
    }
    catch(error){
        console.error(error.message);
        res.status(400).send('Internal Server error');
    }
})


module.exports = router