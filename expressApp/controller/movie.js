import {v4 as uuid} from "uuid";

let movies = [];

export const getMovies = (req,res) =>{
    res.send(movies);
}
export const getMoviesById = (req,res) =>{
    let movie = movies.find(x=>{
        return x.id === req.params.id;
    })
    res.send(movie);
}
export const postMovies = (req,res) =>{
    let movie = req.body;
    let id = uuid();
    movies.push({...movie,id:id});
    res.sendStatus(201);
}
export const deletMoviesById = (req,res) =>{
    movies = movies.filter(x =>{
        return x.id !== req.params.id;
    })
    res.sendStatus(201);
}
export const updateMovieNameById = (req,res) =>{
    const movie = movies.find(x =>{
        return x.id === req.params.id;
    })
    movie.Name = req.body.Name;
    res.sendStatus(201);
}
export const updateMovies = (req,res) =>{
    movies = movies.map(x=>{
        if(x.id === req.params.id)
        {
            x.Name = req.body.Name;
            x.Year = req.body.Year;
            x.Watchable = req.body.Watchable;
        }
        return x;
    })
    res.sendStatus(201);
}