const movieModel = require('../models/movieModel')
const fs = require('fs')


const defaultRoute =async (req,res) => {
  
  try {
    let movies = await movieModel.find();
    res.render("index", { movies });
  } 
  catch (err) {
    console.log(err);
  }

}

const addMovie = (req,res) => {
  
  let addSingleMovie = new movieModel({
    moviename: req.body.moviename,
    catagary: req.body.catagary,
    languages: req.body.languages,
    description: req.body.description,
    types: req.body.types,
    rate: req.body.rate,
    banner: req.file.path
  });

  addSingleMovie.save()
  res.redirect('/')
}

// const viewMovies =async (req,res) => {


// }

const viewMoviePage =async (req,res) => {

  try {
    let movies = await movieModel.find();
    res.render("view", { movies });
  } 
  catch (err) {
    console.log(err);
  }
  
}

const editMovie =async (req,res) => {

  try {
    let editSingaleMovie = await movieModel.findById(req.params.id);
    res.render("edit", { editSingaleMovie });
  } 
  catch (err) {
    console.log(err);
  }

}

const updateMovie =async (req,res) => {

  const { id, moviename, catagary, languages, description, types, rate, banner } = req.body;
  const { path } = req.file;

  try {

    let oldMovie = await movieModel.findById(id);
    fs.unlink(oldMovie.banner, () => {
      console.log("success remove");
    });

    let updatedSingleMovie = await movieModel.findByIdAndUpdate(id, {
      moviename: moviename,
      catagary: catagary,
      languages: languages,
      description: description,
      types: types,
      rate: rate,
      banner: path,
    });
    res.redirect("/");
  } 
  catch (err) {
    console.log(err);
  }

}

const deleteMovie =async (req,res) => {

  try {
    let deleteSingleMovie = await movieModel.findByIdAndDelete(req.params.id);

    fs.unlink(deleteSingleMovie.banner, () => {
      console.log("success remove");
    });

    res.redirect("/");
  } 
  catch (err) {
    console.log(err);
  }

}

const deleteMovieViewPage =async (req,res) => {

  try {
    let deleteSingleMovie = await movieModel.findByIdAndDelete(req.params.id);

    fs.unlink(deleteSingleMovie.banner, () => {
      console.log("success remove");
    });

    res.redirect("/viewMoviePage");
  } 
  catch (err) {
    console.log(err);
  }

}

module.exports = {defaultRoute, addMovie, editMovie, updateMovie, deleteMovie, viewMoviePage, deleteMovieViewPage}