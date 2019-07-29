'use strict'
var movies = require ('../Models/movies'),
    express = require('express'),
    router = express.Router()

    router.use(movies)

    function error404(req, res, next){
        let error = new Error(),
        locals = {
            title: 'ERROR 404',
            description: ' recurso no encontrado',
            error: error
        }
        error.status = 404
        res.render('error', locals)
        
        next()
     }
            
    
    
            router.get('/', (req, res, next) => {
            req.getConnection( (err, movies)=> {
                movies.query('select * from movie', (err, rows) => {
                    let locals =  {
                        title: 'Lista de Peliculas',
                        data: rows
                     }
                    res.render('index', locals)
                    })
                })
            
           })
           
          router.get('/agregar' ,(req, res, next) => {
               let locals = {      title:'Agregar pelicula'           }
            res.render('addmovie',  locals)
           })
                .post('/', (req, res, next) => {
                        req.getConnection( (err, movies) => {
                            let movie = {
                                movie_id: req.body.movie_id,
                                title: req.body.title,
                                release_year: req.body.release_year,
                                rating: req.body.rating,
                                images: req.body.images
                            }
                            console.log(movie)
                            movies.query('INSERT INTO movie SET ?', movie, (err, rows) =>  {
                                return (err) ? res.redirect('error') : res.redirect('/agregar')
                            })
                        })
                        
                })


                router.get('/editar/:movie_id', (req, res, next) => {
                    let movie ={
                        movie_id: req.body.movie_id   }  
                    let moviees = req.params.movie_id                
                    req.getConnection( (err, movies) => {
                        movies.query('SELECT movie_id from movie WHERE movie_id =?', moviees, (err, movies) => {
                        if(err){
                            throw(err)  
                        } else {
                            let locals = {
                                title: 'esta pelicula', 
                                data: movies
                            }
                            res.render('editmovie', req.body.movie_id)
                        }
                    })
                })
            })
            router.post('/actualizar/:movie_id', (req, res, next) =>{
                req.getConnection( (err, movies) => {
                    let movie = {
                        movie_id: req.body.movie_id,
                        title: req.body.title,
                        release_year: req.body.release_year,
                        rating: req.body.rating,
                        images: req.body.images
                    }            
                    movies.query('UPDATE movie SET ? WHERE movie_id =?', [movie, movie.movie_id], (err, rows) =>  {
                        return (err) ? res.redirect('/editar/:movie_id') : res.redirect('/agregar')
                    })
                }) 
            })
            
                
                
                .use(error404)
module.exports = router