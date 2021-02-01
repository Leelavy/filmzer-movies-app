const Movies = require('../models/movies');

const createMovie = async (body) => {
    const movie = new Movies({
        title: body.title,
        year: body.year,
        genre: body.genre,  // delimiter ','
        description: body.description,
        imageURL: body.imageURL,
        trailerVideo: body.trailerVideo
    });
    return await movie.save();
};

const getMovies = async () => {
    return await Movies.find({})
};


const countMovies = async () => {
    return await Movies.countDocuments({})
};


const getMovieByTitle = async (title) => {
    return await Movies.find({'title': {$regex: `.*${title}.*`}});
};


const getMovieById = async (id) => {
    return await Movies.findById(id);
};


const getMovieByImdbTitleId = async (title_id) => {
    return await Movies.find({'imdb_title_id': title_id});
};


const getMovieByTitleGenreRatingYear = async (title, genre, rating, year) => {
    return await Movies.find({'title':{$regex: `.*${title}.*`}, 'genre':{$regex: `.*${genre}.*`}, 'year':year})
        .populate({path:'reviews', match:{'rating':rating}}).exec()};


const updateMovie = async (id, body) => {
    const movie = await getMovieById(id);
    if (!movie)
        return null;

    movie.title = body.title;
    movie.year = body.year;
    movie.genre = body.genre;
    movie.description = body.description;
    movie.imageURL = body.imageURL;
    movie.trailerVideo = body.trailerVideo;
    await movie.save();
    return movie;
};

const updateReviewOfMovie = async (id, review) => {

    const movie = await getMovieById(id);
    if (!movie)
        return null;

    if(!review)
        return null

    if(movie.reviews.indexOf(review._id) === -1){
        movie.reviews.push(review._id);
    }
    await movie.save();

    return movie;
};



const deleteMovie = async (id) => {
    const movie = await getMovieById(id);
    if (!movie)
        return null;

    await movie.remove();
    return movie;
};


module.exports = {
    createMovie,
    getMovies,
    getMovieByTitle,
    getMovieById,
    getMovieByImdbTitleId,
    updateMovie,
    updateReviewOfMovie,
    deleteMovie,
    getMovieByTitleGenreRatingYear,
    countMovies
    }