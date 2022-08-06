const router = require('express').Router();
const fs = require('fs');
const notes = require('../../db/db.json');
const { v4: uuidv4, parse } = require('uuid');
const { createNewNote, findById } = require('../../functions');



router.get('/notes',(req,res)=>{
    // gets the saved notes from db.json to be rendered on the notes page
    let data = notes;
    res.json(data);
});

router.delete('/notes/:id', (req, res) => {
    // calls findById function and passes in the id of the note that was
    // selected for deletion, as well as the array of saved notes
    // so that db.json can be updated
    const result = findById(req.params.id, notes);
    
        // if the findById function successfully returned valid data,
        // return the result as json
        if(result){
            res.json(result);
        }
        // otherwise, return 404 error
        else{
            res.sendStatus(404);
        }
});

router.post('/notes',(req,res) => {
    // set id (generated from the npm uuid package) as a property
    // in the req.body object
    req.body.id = uuidv4();
    
    // calls creatNewNote function and passes in our note data, as well as
    // the array of saved notes so db.json can be updated
    const note = createNewNote(req.body, notes);

    // return the new note so it can be rendered on the notes page
    res.json(note);  
});

module.exports = router;