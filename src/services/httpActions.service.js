import { API_ENDPOINTS } from './config';
import genericHttpCall from './httpHelper.service';


/**
 * 
 * @param {*} page 
 */
export const getNowPlayingMoviesPaged = (page) => {
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
export const searchMovie = (query, page) =>{
    return genericHttpCall(API_ENDPOINTS.SEARCH, {query, page}, {includeCanceler: true})
} 