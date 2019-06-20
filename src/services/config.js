export const SEARCH_INPUT_DELAY = 200;

export const THE_MOVIE_DB_API_KEY = 'bc50218d91157b1ba4f142ef7baaa6a0';

export const API_ROOT = 'https://api.themoviedb.org/3';

export const PROVIDER_CONFIGS = {
    YouTube: {
        thumbRoot: 'http://i3.ytimg.com/vi/',
        thumbExtension: '/hqdefault.jpg',
        linkRoot: 'https://www.youtube.com/watch?v='
    },
    Vimeo: {
        thumbRoot: 'http://b.vimeocdn.com/ts/487/543/',
        thumbExtension: '.jpg',
        linkRoot: 'https://vimeo.com/'
    }
}

export const API_ENDPOINTS = {
    MOVIES_NOW_PLAYING: '/movie/now_playing',
    GENRE_LIST: '/genre/movie/list',
    SEARCH: '/search/movie',
    MOVIE: '/movie/{movie_id}',
    MOVIE_VIDEOS: '/movie/{movie_id}/videos',
    MOVIE_REVIEWS: '/movie/{movie_id}/reviews',
    MOVIE_SIMILAR: '/movie/{movie_id}/similar',
}

export const MOVIE_IMG_ROOT = {
    DETAILS_COVER: 'https://image.tmdb.org/t/p/w1400_and_h450_face/',
    CARD_COVER: 'https://image.tmdb.org/t/p/w500_and_h282_face/',
    THUMB: 'https://image.tmdb.org/t/p/w116_and_h174_face/'
}