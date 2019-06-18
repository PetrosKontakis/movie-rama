
export const STORE_EVENTS = {
    DASHBOARD_PAGE_BOTTOM_SCROLL: 'DASHBOARD_PAGE_BOTTOM_SCROLL'
}

class StoreManager {

    constructor() {
        this.store = {};
    }

    emit = (event, data, log) => {
        if(log){
            console.log(event)
        }
        this.store[event].map(callback => callback(data));
    }

    onStoreChange = (event, callback) => {
        if(!this.store[event]){
            this.store[event] = [];
        }
        this.store[event].push(callback);
    }

    destroyStore = (event) => {
        delete this.store[event];
    }
}

const store = new StoreManager();

export default store;