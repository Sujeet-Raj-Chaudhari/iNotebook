const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Notes');
const {body, validationResult} = require('express-validator');

//ROUTE 1: Get all the Notes using : GET "/api/notes/fetchAllNotes" 
router.get('/fetchAllNotes', fetchUser,  async (req, res)=>{
    try{
        const notes = await Notes.find({user: req.user.id});

        res.json(notes)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Seome error occured");
    }
})



//ROUTE 2: Add the Notes using : POST "/api/notes/addNotes" Login Required 
router.post('/addNotes', fetchUser, [
    body('title', 'Enter a valid title').isString({min: 3}),
    body('description', 'Description must be atleast 5 characters').isString({min: 5}),
], async (req, res)=>{
    
    try{
        const{title, description, tag} = req.body;

        //If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const saveNotes = await note.save()

        res.json(saveNotes)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
    
})


module.exports = router