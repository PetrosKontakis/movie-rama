import React, { Component } from 'react';
import { MOVIE_GENRES } from '../../mocs/movieList.moc';

const GENRES = MOVIE_GENRES.reduce((genreObj, genre) => {
    genreObj[genre.id] = genre.name;
    return genreObj
}, {})

/**
 * Name: MovieListItem
 * Description: MovieListItem is responsible for the movie representation
 */
class MovieListItem extends Component {


    state = {
        genreNames: []
    }



    getGenres(genre_ids) {

        const genreNames = genre_ids.map((id) => {
            // console.log(GENRES[id]);
            return (<span key={id}>{GENRES[id]}, </span>)
        })

        return genreNames;
    }

    render() {

        const { poster_path, title, release_date, genre_ids, vote_average, overview } = this.props.movie
        const img_src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
        const genreNames = this.getGenres(genre_ids);
        return (
            <div className="">
                <img src={img_src} alt={title} />
                <ul>
                    <li>Poster: {poster_path}</li>
                    <li>Title: {title}</li>
                    <li>Year of release: {release_date}</li>
                    <li>Genre(s): {genreNames}</li>
                    <li>Vote average: {vote_average}</li>
                    <li>Overview: {overview}</li>
                </ul>
            </div>
        )
    }
}

export default MovieListItem;