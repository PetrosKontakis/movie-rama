import { THE_MOVIE_DB_API_KEY, API_ROOT } from './config';


let httpAborts = [];

/**
 * TODO: Comments
 * @param {*} params 
 */
const getParamsAsString = (params) => {
    return Object.keys(params).map(function (key, value) {
        return `${key}=${params[key]}`
    }).join("&");
}

/**
 * 
 */
const abortCancelers = () => {
    // Cancel all calls including signal canceler 
    httpAborts.map(httpAbort => httpAbort.abort());
}

/**
 * @return signal
 */
const addNewCanceler = () => {
    //  Create new canceler 
    const newHttpAbort = new AbortController();
    // Add a new on to stack 
    httpAborts.push(newHttpAbort);

    return newHttpAbort.signal;
}

/**
 * TODO:comments
 */
const genericHttpCall = (endPoint, params = {}, options = {}) => {

    let fetchOpt = {};
    if (options.includeCanceler) {
        // Abort all http calls with includeCanceler
        abortCancelers();
        // Add new canceler 
        const signal = addNewCanceler();
        //  add signal to fetch opts 
        fetchOpt['signal'] = signal;
    }

    // Add parameter api_key
    params['api_key'] = THE_MOVIE_DB_API_KEY;
    // Convert object parameters to string
    const urlParameters = getParamsAsString(params);

    return fetch(`${API_ROOT}${endPoint}?${urlParameters}`, fetchOpt)
        .then(response => response.json())
        .catch(error => error.json());

}

export default genericHttpCall;