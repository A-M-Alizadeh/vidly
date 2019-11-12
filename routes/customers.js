const express = require('express');
const router = express.Router();
const customerDB = require('./../service/customer');
const {validateCustomer} = require('./../models/customer');

//==========================================================get all genres
router.get('/',async (req, resp)=>{
    resp.send(await customerDB.getAllCustomers());
});

//==========================================================add a genre  
router.post('/',async (req, resp)=>{
    //validate genre
    const {error} = validateCustomer(req.body);
    if(error) return resp.status(400).send(error.details[0].message);
    //add to genres  
    // const genre={
    //         id: genres.length+1,
    //         name: req.body.name,
    // }
    // genres.push(genre);
    console.log(req.body);
    resp.send(await customerDB.saveCustomer(req.body));
});

//==========================================================update a genre
router.put('/:id',async (req, resp)=>{
    //validate body data
    const {error} = validateCustomer(req.body);
    if(error) return resp.status(400).send(error.details[0].message);

    //updaing genre
    const genre = await customerDB.updateCustomer(req.params.id, req.body);
    //check if id exists
    if(!genre)return resp.status(404).send('Genre with given id was not found');
    //update genre
    resp.send(genre);

});

//================================================= =========delete a genre
router.delete('/:id',async (req, resp)=>{
    //delete genre
    const genre = await customerDB.deleteCustomer(req.params.id);
    //check if id exists
    if(!genre)return resp.status(404).send('Genre with given id was not found');
    //return the same genre
    resp.send(genre);
});

//==========================================================find a genre
router.get('/:id',async (req, resp)=>{
    const genre = await customerDB.findCustomerById(req.params.id);
    if(!genre)return resp.status(404).send('Genre with given id was not found');
    resp.send(genre)
});

module.exports = router;