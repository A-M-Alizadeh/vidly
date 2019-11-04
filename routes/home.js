const express = require('express');
const router = express.Router();

//==========================================================home page
router.get('/',(req, resp)=>{
    resp.render('index',{title:'Vidly', message:'Renting Videos Online'});
});

module.exports = router;
