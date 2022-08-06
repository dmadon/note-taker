const router = require('express').Router();
const fs = require('fs');
// const {filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const notes = require('../../db/db.json');
const { v4: uuidv4, parse } = require('uuid');
const { createNewNote } = require('../../functions');


router.get('/notes',(req,res)=>{
    let data = notes;
    // if(req.query){
    //     results = filterByQuery(req.query,results);
    // }
    res.json(data);
    console.log('Current note array: '+JSON.stringify(data));

});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
        if(result){
            res.json(result);
            console.log(result)
        }
        else{
            res.sendStatus(404);
        }
  });

router.post('/notes',(req,res) => {
    // req.body is where our incoming content will be
    // set id generated from the npm uuid package
    req.body.id = uuidv4();
    console.log('New note: '+JSON.stringify(req.body));
   

    const note = createNewNote(req.body, notes);
    // res.json(note);



    // if any data in req.body is incorrect, send 400 error back
    // if(!validateNotes(req.body)){
    //     res.status(400).send("This data is not properly formatted. Please ensure that all properties are completed with the correct data type.");
    // }
    // else{
    //     const note = createNewNote(req.body, notes);
    //     res.json(note);
    // }




    
});

module.exports = router;