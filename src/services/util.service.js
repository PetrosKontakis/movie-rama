import { THE_MOVIE_DB_API_KEY, API_ROOT } from './config';
import store, { EVENTS } from './store.service';

/**
 * ex.
 *  input: 'hello world', 2, true
 *  output: 'he...'
 */
export const subStringParagraph = (paragraph = '', toLength, includeDots) => {

    const canSub = paragraph && toLength && paragraph.length > toLength;
    if (canSub) {
        const dots = includeDots ? '...' : '';
        return paragraph.substring(0, toLength) + dots;
    }

    return paragraph;
}

/**
 * ex: input: '{key: value, key2: value2}' output: 'key=value&key2=value2'
 * @param {*} params 
 */
export const getParamsAsString = (params) => {
    return Object.keys(params).map(function (key, value) {
        return `${key}=${params[key]}`
    }).join("&");
}

/**
 * This function cancel all stored http abort controllers
 */
export const abortCancelers = () => {

    // Get abort data from store
    let httpAborts = store.getStore(EVENTS.HTTP_ABOARD)
    // Set empty array if not exist
    httpAborts = httpAborts ? httpAborts : [];
    // Cancel all calls including signal canceler 
    httpAborts.map(httpAbort => httpAbort.abort({ canceled: true }));
    // Save data
    store.emit(EVENTS.HTTP_ABOARD, httpAborts)
}

/**
 * @return signal
 */
export const addNewCanceler = () => {

    // Get abort data from store
    let httpAborts = store.getStore(EVENTS.HTTP_ABOARD)
    // Set empty array if not exist
    httpAborts = httpAborts ? httpAborts : [];
    //  Create new canceler 
    const newHttpAbort = new AbortController();
    // Add a new on to stack 
    httpAborts.push(newHttpAbort);
    // Save data
    store.emit(EVENTS.HTTP_ABOARD, httpAborts)

    return newHttpAbort.signal;
}

/**
 * ex. input: '/movie/{movie_id}/reviews' output: [{stringToReplace: '{movieId}', param: 'movie_id'}]
 * @param {*} endPoint 
 */
export const getMatchingGroups = (endPoint) => {
    const regex = /\{(.*?)\}/g
    let matchingGroups = []
    let match;
    while (match = regex.exec(endPoint)) {
        matchingGroups.push({
            stringToReplace: match[0],
            param: match[1]
        });
    }
    return matchingGroups;
};

/**
 * 
 * @param {*} endPoint 
 * @param {*} params 
 */
export const getUrlExtension = (endPoint, params) => {
    //  Get parameters from endpoint that match to template {test}
    const matchingGroups = getMatchingGroups(endPoint);

    matchingGroups.forEach((group) => {
        //  check if template parameters exist on params object input 
        if (params[group.param] != null) {
            //  Change endpoint template with the parameter actual value
            endPoint = endPoint.replace(group.stringToReplace, params[group.param]);
            //  Remove it for params object
            delete params[group.param]
            //  console.log(`Parameter: ${group.param} exist on template endpoint: ${endPoint}`)
        }
        else {
            // there is no param pass mapped with endpoint string 
            // remove place holder from endpoint
            endPoint = endPoint.replace('/' + group.stringToReplace, '');
        }
    });

    // Convert object parameters to string
    let urlParameters = getParamsAsString(params);

    urlParameters = urlParameters ? '?' + urlParameters : '';

    return endPoint + urlParameters;
}

/**
 * Generic http call
 * ex. input: 
 *          endpoint= '/movie/{movie_id}', 
 *          params={movie_id:1}, 
 *          options={includeCanceler:true}
 *  output: Promise
 */
export const genericHttpCall = (endPoint, params = {}, options = {}) => {

    let fetchOpt = {};
    if (options.includeCanceler) {
        // Abort all http calls with includeCanceler
        abortCancelers();
        // Add new canceler 
        const signal = addNewCanceler();
        //  add signal to fetch opts 
        fetchOpt['signal'] = signal;
    }

    // Add api_key parameter
    params['api_key'] = THE_MOVIE_DB_API_KEY;
    // Get url ext
    const apiUrl = API_ROOT + getUrlExtension(endPoint, params);

    return fetch(apiUrl, fetchOpt)
        .then(response => response.json())
        .catch(error => {
            //  if error is cancel request by user sent to 
            // error chain with abort = true
            if (error.name === 'AbortError') {
                return new Promise((resolve, reject) => {
                    reject({ abort: true })
                })
            }
            return error.json()
        })
}
