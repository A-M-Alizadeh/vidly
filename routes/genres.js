const express = require('express');
const router = express.Router();
const genreDB = require('./../service/genre');
const {validateGenre} = require('./../models/genre');

//==========================================================get all genres
router.get('/',async (req, resp)=>{
    resp.send(await genreDB.getAllGenres());
});

//==========================================================add a genre
router.post('/',async (req, resp)=>{
    //validate genre
    const {error} = validateGenre(req.body);
    if(error) return resp.status(400).send(error.details[0].message);
    //add to genres  
    // const genre={
    //         id: genres.length+1,
    //         name: req.body.name,
    // }
    // genres.push(genre);
    resp.send(await genreDB.saveGenre(req.body.name));
});

//==========================================================update a genre
router.put('/:id',async (req, resp)=>{
    //validate body data
    const {error} = validateGenre(req.body);
    if(error) return resp.status(400).send(error.details[0].message);

    //updaing genre
    const genre = await genreDB.updateGenre(req.params.id, req.body.name);
    //check if id exists
    if(!genre)return resp.status(404).send('Genre with given id was not found');
    //update genre
    resp.send(genre);

});

//================================================= =========delete a genre
router.delete('/:id',async (req, resp)=>{
    //delete genre
    const genre = await genreDB.deleteGenre(req.params.id);
    //check if id exists
    if(!genre)return resp.status(404).send('Genre with given id was not found');
    //return the same genre
    resp.send(genre);
});

//==========================================================find a genre
router.get('/:id',async (req, resp)=>{
    const genre = await genreDB.findGenreById(req.params.id);
    if(!genre)return resp.status(404).send('Genre with given id was not found');
    resp.send(genre)
});

module.exports = router;