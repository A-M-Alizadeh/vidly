const express = require('express');
const Joi = require('@hapi/joi');
const app = express();
const body = app.use(express.json());

//variables
const genres = [
    { id: 1, name: 'Romantic'},
    { id: 2, name: 'Horror'},
    { id: 3, name: 'Action'},
    { id: 4, name: 'Fiction'},
    { id: 5, name: 'Documentary'},
    { id: 6, name: 'Thriller'},
    { id: 7, name: 'Drama'},
    { id: 8, name: 'Mystery'},
]

const PORT = process.env.PORT || 3000
//variables

//==========================================================get all genres
app.get('/api/genres',(req, resp)=>{
    resp.send(genres)
});

//==========================================================find a genre
app.get('/api/genres/:id',(req, resp)=>{
    const genre = genres.find(g=>{return g.id == parseInt(req.params.id)})
    if(!genre)return resp.status(404).send('Genre with given id was not found');
    resp.send(genre)
});


//==========================================================add a genre
app.post('/api/genres',(req, resp)=>{
    //validate genre
    const {error} = validateGenre(req.body);
    if(error) return resp.status(400).send(error.details[0].message);
    //add to genres  
    const genre={
            id: genres.length+1,
            name: req.body.name,
    }
    genres.push(genre);
    resp.send(genre);
});


//==========================================================update a genre
app.put('/api/genres/:id',(req, resp)=>{
    //check if id exists
    const genre = genres.find(g=>{return g.id == parseInt(req.params.id)})
    if(!genre)return resp.status(404).send('Genre with given id was not found');
    //validate body data
    const {error} = validateGenre(req.body);
    if(error) return resp.status(400).send(error.details[0].message);
    //update genre
    const index = genres.indexOf(genre);
    genre.name = req.body.name;
    resp.send(genre);

});


//==========================================================delete a genre
app.delete('/api/genres/:id',(req, resp)=>{
    //check if id exists
    const genre = genres.find(g=>{return g.id == parseInt(req.params.id)})
    if(!genre)return resp.status(404).send('Genre with given id was not found');
    //delete genre
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    //return the same genre
    resp.send(genre);
});
//==========================================================FUNCTIONS

const validateGenre = (genre)=>{
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
    });
    return schema.validate(genre);
}

//==========================================================listening port
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT} ...`)
})
