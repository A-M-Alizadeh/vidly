const mongoose = require('mongoose')
const Joi = require('@hapi/joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim:true,
    },
    isGold:{
        type:Boolean,
        required:true
    },
    phone:{
        type:String,
        required:true, 
        minlength:10,
        maxlength:15
    }
}));

const validateCustomer = (genre)=>{
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        isGold: Joi.string()
            .required(),
        phone: Joi.string()
            .min(10)
            .max(15)
            .required(),
    });
    return schema.validate(genre);
}

module.exports={Customer,validateCustomer}