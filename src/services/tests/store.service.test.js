import store from '../store.service';

it('adding & getting from store to store', ()=>{
    store.emit('add_data', 1);
    expect(store.getStore('add_data')).toBe(1);
})

it('receiving store with event listener', ()=>{
    var initialData = 0;
    store.onStoreChange('add_data', function(data){
        initialData = data;
    })
    store.emit('add_data', 1);
    expect(initialData).toBe(1);
})

it('delete store', ()=>{
    store.emit('add_data', 1);
    store.destroyStore('add_data')
    expect(store.getStore('add_data')).toBeUndefined();
})
