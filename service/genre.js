const {Genre} = require('./../models/genre');

const saveGenre = async(name)=>{
    console.log('savinnnnng...')
    let genre = new Genre({name: name});
    return await genre.save();
}

const updateGenre = async(id, name)=>{
    return await Genre.findByIdAndUpdate(id,{name:name},{new:true});
    // return await Genre.findOneAndUpdate(id,{name:name},{new:true});
}

const deleteGenre = async(id)=>{
    return await Genre.findByIdAndRemove(id);
}

const findGenreById = async(id)=>{
    return await Genre.findById(id);
}

const getAllGenres = async()=>{
    return await Genre.find().sort('name');
}

module.exports = {saveGenre,updateGenre,deleteGenre,findGenreById,getAllGenres}
