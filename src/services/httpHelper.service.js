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


const getMatchingGroups = (endPoint) => {
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

    //  Get parameters from endpoint that match to template {test}
    const matchingGroups = getMatchingGroups(endPoint);

    matchingGroups.forEach((group) => {
        //  check if template parameters exist on params object input 
        if (params[group.param]) {
            //  Change endpoint template with the parameter actual value
            endPoint = endPoint.replace(group.stringToReplace, params[group.param]);
            //  Remove it for params object
            delete params[group.param]
            //  console.log(`Parameter: ${group.param} exist on template endpoint: ${endPoint}`)
        }
        else {
            //  TODO: return promise rejection 
            console.error(`parameter: '${group.param}' is required on request: ${endPoint}`)
        }
    });


    // Add api_key parameter
    params['api_key'] = THE_MOVIE_DB_API_KEY;
    // Convert object parameters to string
    const urlParameters = getParamsAsString(params);

    return fetch(`${API_ROOT}${endPoint}?${urlParameters}`, fetchOpt)
        .then(response => response.json())
        .catch(error => error.json());

}

export default genericHttpCall;