
export const EVENTS = {
    GENRE_LIST_RECEIVED: 'GENRE_LIST_RECEIVED',
    HTTP_ABOARD: 'HTTP_ABOARD'
}

/**
 * Service that keeping event base data
 * How to user:
 *    1. Add `store.onStoreChange('eventName', callback)` in place that needed 
 *      data listener.
 *    2. Broadcast event when data received by `store.emit('eventName', data)` 
 */
class StoreManager {

    constructor() {
        this.emitters = {};
        this.data = {};
    }

    emit = (event, data, log) => {
        if (log) {
            console.log(event, data)
        }

        // Store event data 
        this.data[event] = data;
        if (this.emitters[event] == null) {
            return;
        }
        this.emitters[event].map(callback => callback(data));
    }

    onStoreChange = (event, callback) => {
        if (!this.emitters[event]) {
            this.emitters[event] = [];
        }
        // Store emitter callback
        this.emitters[event].push(callback);
        // Execute callback  if exist data
        if (this.data[event]) {
            callback(this.data[event]);
        }
        //  Return data anyway
        return this.data[event];
    }

    getStore = (event) => {
        return this.data[event];
    }

    destroyStore = (event) => {
        delete this.emitters[event];
        delete this.data[event];
    }
}

/**
 *  Export the instance of StoreManager
 */  
export default  new StoreManager();