const mongoose = require('mongoose')

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        lowercase:true,
        trim:true,
    },
}));

export const saveGenre = async(name)=>{
    let genre = new Genre({name: name});
    return await genre.save();
}

export const updateGenre = async(id, name)=>{
    return await Genre.findByIdAndUpdate(id,{name:name},{new:true})
}

export const deleteGenre = async(id)=>{
    return await Genre.findByIdAndRemove(id);
}

export const findGenreById = async(id)=>{
    return await Genre.findById(id);
}

export const getAllGenres = async()=>{
    return await Genre.find().sort('name');
}
