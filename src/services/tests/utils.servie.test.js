import {
    subStringParagraph,
    getParamsAsString,
    getMatchingGroups,
    getUrlExtension,
    genericHttpCall,
} from '../util.service';

/**
 * ex. input: ('hello world', 2, true)  output: 'he...'
 */
it(" ex. input: ('hello world', 2, true)  output: 'he...'", () => {
    expect(subStringParagraph('hello world', 2, true)).toEqual('he...');
    expect(subStringParagraph('hello', 5)).toEqual('hello');
});

/**
 * ex: input: '{key: value, key2: value2}' output: 'key=value&key2=value2'
 * @param {*} params 
 */
it("ex: input: '{key: value, key2: value2}' output: 'key=value&key2=value2'", () => {
    const object = { key: 'value', key2: 'value2' };
    expect(getParamsAsString(object)).toEqual('key=value&key2=value2');
});

/**
 * ex. input: '/movie/{movie_id}/reviews' output: [{stringToReplace: '{movie_id}', param: 'movie_id'}]
 * @param {*} endPoint 
 */
it("getMatchingGroups return array ex. input: '/movie/{movie_id}/reviews'", () => {
    const expectation = [{ stringToReplace: '{movie_id}', param: 'movie_id' }];

    const input = getMatchingGroups('/movie/{movie_id}/reviews');
    expect(input).toEqual(expectation);
});

/**
 * ex. endpoint = '/movie/{movie_id}/reviews' params={movie_id: 0} 
 * result: /movie/0/reviews
 * @param {*} endPoint 
 */
it("pass parameter to template", () => {
    expect(getUrlExtension('/movie/{movie_id}/reviews', { movie_id: 0 })).toEqual('/movie/0/reviews');
});

it("removes template parameter if no parameter passed", () => {
    expect(getUrlExtension('/movie/{movie_id}/reviews', { })).toEqual('/movie/reviews');
});

it("adding question parameter &  template parameter", () => {
    expect(getUrlExtension('/movie/{movie_id}/reviews', { movie_id:0 , page:10})).toEqual('/movie/0/reviews?page=10');
});

it("adding multi question parameter &  multi template parameter", () => {
    expect(getUrlExtension('/movie/{movie_id}/review/{review_id}', 
    { movie_id:0 , review_id: 1, page:10, key:20})).toEqual('/movie/0/review/1?page=10&key=20');
});

it("removing multi values from template params", () => {
    expect(getUrlExtension('/movie/{movie_id}/review/{review_id}', 
    { page:10, key:20})).toEqual('/movie/review?page=10&key=20');
});

it('return promise for genericHttpCall', ()=>{
    expect(genericHttpCall('endpoint')).toBeInstanceOf(Promise);
})