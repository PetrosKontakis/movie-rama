
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
        this.backdropPath = backdrop_path != null? backdrop_path: poster_path;
        this.genreIds = genre_ids;
        this.id = id;
        this.title = title;
        this.voteAverage = vote_average;
        this.overview = overview;
        this.releaseDate = release_date;
        this.posterPath = poster_path;

    }

    getCover() {
        return `https://image.tmdb.org/t/p/w1400_and_h450_face/${this.backdropPath}`;
    }
    getMdPoster() {
        return `https://image.tmdb.org/t/p/w500_and_h282_face/${this.backdropPath}`;
    }

    getPreviewPoster() {
        return `https://image.tmdb.org/t/p/w116_and_h174_face/${this.posterPath}`;
    }

    getOverviewDesc() {
        const MAX_OVERVIEW_DESC = 50;
        const showMore = this.overview && this.overview.length > MAX_OVERVIEW_DESC ? "...":"";
        const shortContent = this.overview && this.overview.substring(0, MAX_OVERVIEW_DESC);
        return shortContent + showMore;
    }
    getHumanDate(){
        return this.releaseDate;
    }
}

export default Movie;

