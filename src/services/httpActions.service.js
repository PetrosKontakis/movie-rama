import { API_ENDPOINTS } from './config';
import genericHttpCall from './httpHelper.service';

/**
 * TODO: COMMENTS
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