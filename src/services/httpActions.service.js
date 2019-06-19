import { API_ENDPOINTS } from './config';
import genericHttpCall from './httpHelper.service';


/**
 * 
 * @param {*} page 
 */
export const getNowPlayingMoviesPaged = ({page}) => {
    return genericHttpCall(API_ENDPOINTS.MOVIES_NOW_PLAYING, {page});
}

/**
 * TODO: COMMENTS
 */
export const getGenreList = () => {
    return genericHttpCall(API_ENDPOINTS.GENRE_LIST);
}

/**
 * 
 * @param {*} query 
 * @param {*} page 
 */
export const searchMovie = ({query, page}) =>{
    return genericHttpCall(API_ENDPOINTS.SEARCH, {query, page}, {includeCanceler: true})
} 

export const getMovieDetails = (movie_id) => {
    return genericHttpCall(API_ENDPOINTS.MOVIE, {movie_id})
}

export const getMovieVideos = (movie_id) => {
    return genericHttpCall(API_ENDPOINTS.MOVIE_VIDEOS, {movie_id})
}

export const getMovieReviews = (movie_id) => {
    return genericHttpCall(API_ENDPOINTS.MOVIE_REVIEWS, {movie_id})
}

export const getMovieSimilar = ({movie_id, page}) => {
    return genericHttpCall(API_ENDPOINTS.MOVIE_SIMILAR, {movie_id, page})
}