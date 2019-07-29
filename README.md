Problema #1:

Las Url de cualquier imagen que se quiera subir a mysql sube con exito al momento de leer poder renderisar la imagen en navegador 
no se logra ver en index.pug "poster" es una clase de css nada de otro mundo.


                                        img.poster(src="#{movie.images}" )
                             

problema #2

el boton de editar hay problemas con la ruta ya que no hubica la ruta que se coloco en el form de la tabla 

                           td
                                        form(method="get" action="/editar/#{movie_id}") 
                                            input.button.edit(type="submit", value="Editar")
 como se logra ver en index.pug
 
 y en mi archivo index.js ubicado en la carpeta de Routes tengo mi siguiente midleware la cual en la primera linea voy a llamar el movie_id
 como lo tengo indicado en mi formulario 
 
  router.get('/editar/:movie_id', (req, res, next) => {
                        let moviee_id = req.params.movie_id  
                           
                        req.getConnection( (err, rows) => {
                            movies.query('SELECT * FROM movie WHERE movie_id = ?', moviee_id, (err, rows) => {
                           
                            if(err){
                                throw(err)  
                            } else {
                                let locals = {
                                    title: 'esta pelicula', 
                                    data: rows
                                }
                        res.render('editmovie', locals)
                        
                            }
                        })
                    })
                })
