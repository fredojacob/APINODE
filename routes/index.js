'use strict'
var movies = require ('../Models/movies'),
    express = require('express'),
    router = express.Router()

    

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
                        
                router.use(movies)
    
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
                                data: movies
                            }
                            res.render('editmovie', locals)
                        }
                    })
                })
                                                                    })
                 router.post('/editar/:movie_id' , (req, res, next) =>{
                console.log(movies)
                    req.getConnection( (err, movies) => {
                        let idd = req.params.movie_id
                        let movie = {
                            movie_id: req.params.movie_id,
                            title: req.params.title,
                            release_year: req.params.release_year,
                            rating: req.params.rating,
                            images: req.params.images
                        }  
                    console.log(movie)
                            
                    movies.query('UPDATE movie SET ? WHERE movie_id =?', [movie, movie.movie_id], (err, movies) =>  {
                        console.log('actualizado')
                        return (err) ? res.redirect('/editar/:movie_id') : res.redirect('/')
                       
                    })
                }) 
                                                                    }) 

                 router.post('/eliminar/:movie_id' , (req, res, next) => {
                let movie_id = req.params.movie_id
                console.log(movie_id)
                req.getConnection((err, movies) => {

                    movies.query('DELETE FROM movie WHERE movie_id=?', movie_id, (err, movies)=>{

                        console.log(err, '--', movies)
                        return(err) ? next( new Error('registro no encontrado')) : res.redirect('/')
                        
                    })
                })

                                                                    })
     
                .use(error404)
module.exports = router