import {
    getNowPlayingMoviesPaged, getGenreList,
    searchMovie, getMovieDetails, getMovieVideos,
    getMovieReviews,
    getMovieSimilar
} from '../httpActions.service';



/**
 * instance of Promise
 */
it("getNowPlayingMoviesPaged of Promise", () => {
    expect(getNowPlayingMoviesPaged({ page: 1 }))
        .toBeInstanceOf(Promise);
});

it("getGenreList of Promise", () => {
    expect(getGenreList()).toBeInstanceOf(Promise);
});

it("searchMovie of Promise", () => {
    expect(searchMovie({ page: 1 })).toBeInstanceOf(Promise);
});

it("getMovieDetails of Promise", () => {
    expect(getMovieDetails(1)).toBeInstanceOf(Promise);
});

it("getMovieVideos of Promise", () => {
    expect(getMovieVideos(1)).toBeInstanceOf(Promise);
});

it("getMovieReviews of Promise", () => {
    expect(getMovieReviews(1)).toBeInstanceOf(Promise);
});

it("getMovieSimilar of Promise", () => {
    expect(getMovieSimilar({movie_id:1, page: 1 }))
        .toBeInstanceOf(Promise);
});
