const unirest = require("unirest");
const Movies = require('../models/movies');

const get = (req, res)=>{
    Movies.find().cache(0, 'GALLERY-CACHE-KEY').then(result => {
        res.json(result.slice(0, 5));
    });
};

const create = (req, res) => {

    const movies =  new Movies({
        imdb_title_id: req.body.imdb_title_id,
        title: req.body.title,
        original_title: req.body.original_title,
        year: parseInt(req.body.year),
        date_published: req.body.date,
        genre: req.body.genre,
        duration: parseInt(req.body.duration),
        country: req.body.country,
        language: req.body.language,
        director: req.body.director,
        writer: req.body.writer,
        production_company: req.body.production_company,
        actors: req.body.actors,
        description: req.body.description,
        avg_vote: parseFloat(req.body.avg_vote),
        votes: parseInt(req.body.votes),
        budget: req.body.budget,
        usa_gross_income: req.body.usa_gross_income,
        worlwide_gross_income: req.body.worlwide_gross_income,
        metascore: parseFloat(req.body.metascore),
        reviews_from_users: parseFloat(req.body.reviews_from_users),
        reviews_from_critics: parseFloat(req.body.reviews_from_critics)
    });
    movies.save().then(()=>{
        cachegoose.clearCache('GALLERY-CACHE-KEY');
        res.redirect('/movies')
    }).catch(error => {
        res.send(error)
    });
};

const getByTitle = (req, res) =>
    {Movies.find(
        {'title':
                {$regex: `.*${req.params.movieTitle}.*`}}
                ).then(movies => {res.json(movies);})};


const getById = (req, res) => {
    Movies.findById(req.params.movieId
            ).then(movies =>
                        {res.json(movies);})};

const getByImdbTitleId = (req, res) =>
    {Movies.find(
        {'imdb_title_id':
                req.params.imdbTitleId}
        ).then(movies => {res.json(movies);})};


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

const update = (req, res) => {
    res.json(movies);
};

const remove = (req, res) => {
    res.json(movies);
};

module.exports = {get, create, getByTitle, update, remove, getById, getByImdbTitleId, getImageByTitleId}