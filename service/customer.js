const mongoose = require('mongoose')

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
        minlength:10,
        maxlength:15
    }
}));

const saveCustomer = async(newcustomer)=>{
    console.log('savinnnnng customer ...')
    let customer = new Customer({name:newcustomer.name,isGold:newcustomer.isGold,phone:newcustomer.phone});
    return await customer.save();
}

const updateCustomer = async(id, customer)=>{
    return await Customer.findByIdAndUpdate(id,{name:customer.name,isGold:customer.isGold,phone:customer.phone},{new:true});
    // return await Genre.findOneAndUpdate(id,{name:name},{new:true});
}

const deleteCustomer = async(id)=>{
    return await Customer.findByIdAndRemove(id);
}

const findCustomerById = async(id)=>{
    return await Customer.findById(id);
}

const getAllCustomers = async()=>{
    return await Customer.find().sort('name');
}

module.exports = {saveCustomer,updateCustomer,deleteCustomer,findCustomerById,getAllCustomers}
