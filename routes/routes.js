const express = require('express');
const app = express();
const controllers = require('../controllers/controllers')
const bannerUpload = require('../middlewares/bannerMiddelware')

app.get('/', controllers.defaultRoute)
app.post('/addMovie', bannerUpload.single('banner'), controllers.addMovie)
// app.get('/viewMovies', controllers.viewMovies)
app.get('/viewMoviePage', controllers.viewMoviePage)
app.get('/editMovie/:id', controllers.editMovie)
app.post('/updateMovie', bannerUpload.single('banner'), controllers.updateMovie)
app.get('/deleteMovie/:id', controllers.deleteMovie)
app.get('/deleteMovieViewPage/:id', controllers.deleteMovieViewPage)

module.exports = app