import { THE_MOVIE_DB_API_KEY, API_ROOT } from './config';

/**
 * TODO: Comments
 * @param {*} params 
 */
const getParamsStringArray = (params) => {
    return Object.keys(params).map(function (key, value) {
        return `${key}=${params[key]}`
    });
}


/**
 * TODO:comments
 */
const genericHttpCall = (endPoint, params = {}) => {

    params['api_key'] = THE_MOVIE_DB_API_KEY;

    const paramsArray = getParamsStringArray(params);

    const paramsString = paramsArray.join("&");

    return fetch(`${API_ROOT}${endPoint}?${paramsString}`)
        .then(response => response.json())
        .catch(error => error.json());

}

export default genericHttpCall;