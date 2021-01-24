
const unirest = require("unirest");
const moviesService = require('../services/movies');


const createMovie = async (req, res) => {
    const newMovie = await moviesService.createMovie(req.body);
    res.json(newMovie);
};


const getMovies = async (req, res) => {
    const movies = await moviesService.getMovies();
    res.json(movies);
};


const getMovieByTitle = async (req, res) => {
    const movie = await moviesService.getByTitle(req.params.movieTitle);

    if (!movie) {
        return res.status(404).json({errors: ['Movie not found']});
    }

    res.json(movie);
};


const getMovieById = async (req, res) => {
    const movie = await moviesService.getMovieById(req.params.movieId);

    if (!movie){
        return res.status(404).json({errors: ['Movie not found']});
    }

    res.json(movie);
};


const getMovieByImdbTitleId = async (req, res) => {
    const movie = await moviesService.getMovieById(req.params.imdbTitleId);

    if (!movie){
        return res.status(404).json({errors: ['Movie not found']});
    }

    res.json(movie);
};


const getImageByTitleId = (req, res) => {

    var reqApi = unirest("GET", "https://imdb8.p.rapidapi.com/title/get-meta-data");

    reqApi.query({
        "ids": req.params.imdbTitleId
    });

    reqApi.headers({
        "x-rapidapi-key": "c70cdcce54mshf2099e49559503cp11be87jsna6dcf3ca1c09",
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "useQueryString": true
    });

    reqApi.end(function (resApi) {
        if (resApi.error) throw new Error(resApi.error);

        return res.json(resApi.body[req.params.imdbTitleId]['title']['image']['url'])
    });

};

const updateMovies = async (req, res) => {
    if (!req.body) {
        res.status(400).json({
            message: "movies param are required",
        });
    }

    const movies = await moviesService.updateMovie(req.params.id, req.body);
    if (!movies) {
        return res.status(404).json({ errors: ['movies not found'] });
    }

    res.json(movies);
};


const deleteMovie = async (req, res) => {
    const movie = await moviesService.deleteMovie(req.params.id);
    if (!movie) {
        return res.status(404).json({ errors: ['movie not found'] });
    }

    res.send();
};


module.exports = {
    createMovie,
    getMovies,
    getMovieByTitle,
    getMovieById,
    getMovieByImdbTitleId,
    getImageByTitleId,
    updateMovies,
    deleteMovie
}