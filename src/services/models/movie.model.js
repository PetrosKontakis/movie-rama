import { subStringParagraph } from '../util.service';
import { MOVIE_IMG_ROOT } from '../config';

class Movie {

    /**
     * 
     *
     *  @param {*} movie 
     */
    constructor(movie) {
        const { backdrop_path, genre_ids, id,
            title, vote_average, overview, release_date, poster_path } = movie;
        this.data = movie;
        this.backdropPath = backdrop_path != null ? backdrop_path : poster_path;
        this.genreIds = genre_ids;
        this.id = id;
        this.title = title;
        this.voteAverage = vote_average;
        this.overview = overview;
        this.releaseDate = release_date;
        this.posterPath = poster_path;
    }

    getCover() {
        return MOVIE_IMG_ROOT.DETAILS_COVER + this.backdropPath;
    }

    getMdPoster() {
        return MOVIE_IMG_ROOT.CARD_COVER + this.backdropPath;
    }

    getPreviewPoster() {
        return MOVIE_IMG_ROOT.THUMB + this.posterPath;
    }

    getOverviewDesc() {
        return subStringParagraph(this.overview, 50, true);
    }

    getHumanDate() {
        // TODO
        return this.releaseDate;
    }
}

export default Movie;

