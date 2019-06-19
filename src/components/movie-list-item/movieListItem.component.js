import React, { Component } from 'react';

import './movieListItem.component.style.scss';
import store, { EVENTS } from '../../services/store.service';
import ElementPosition from '../../services/models/elementPosition.model';
import Movie from '../../services/models/movie.model';
import PropTypes from 'prop-types';

/**
 * Name: MovieListItemGhost
 * Description:  Empty movie list item for loading view
 */
export const MovieListItemGhost = () => {
    return (
        <div className="mv-masonry-grid mv-masonry-sm">
            <div className="mv-card  mv-card-sm mv-card-ghost">
                <div className="mv-card-poster"></div>
                <div className="mv-card-content">
                    <div className="title"></div>
                    <div className="genre"></div>
                </div>
                <div className="mv-card-footer"></div>
            </div>
        </div>
    )
}

/**
 * Name: MovieListItem
 * Description: MovieListItem is responsible for the movie representation
 */
class MovieListItem extends Component {


    state = {
        genreNames: []
    }

    componentDidMount() {
        store.onStoreChange(EVENTS.GENRE_LIST_RECEIVED,
            (data) => {
                this.setGenreNames(data)
            })
    }


    handleCardClick = (e) => {
        this.props.onMovieSelect(this.props.movie, this.getOffset(e.currentTarget));
    }

    setGenreNames(genreList) {
        const { genreIds } = this.props.movie;
        const genreNames = genreList.filter((genre) => {
            return genreIds.includes(genre.id);
        }).map(genre => genre.name);
        this.setState({ genreNames });
    }

    getOffset = (el) => {
        const rect = el.getBoundingClientRect();
        return new ElementPosition({
            top: rect.top,
            left: rect.left,
            right: rect.left + el.offsetWidth,
            bottom: rect.top + el.offsetHeight,
            width: el.offsetWidth,
            height: el.offsetHeight
        })
    }

    render() {

        const {size, movie} = this.props;
        const genre = this.state.genreNames.join(", ");

        return (
            <div
                className={`mv-masonry-grid mv-masonry-${size}`} title={movie.overview}>
                <div
                    onClick={this.handleCardClick}
                    className={`mv-card  mv-card-${size}`}>
                    <div className="mv-card-poster"
                        style={{ backgroundImage: `url(${movie.getMdPoster()})` }}>
                    </div>
                    <div className="mv-card-content">
                        <div className="title">
                            {movie.title}
                        </div>
                        <div className="genre">
                            {genre}
                        </div>
                        <div className="overview">
                            {movie.getOverviewDesc()}
                        </div>
                    </div>
                    <div className="mv-card-footer">
                        <div className="md-block-left">
                            {movie.getHumanDate()}
                        </div>
                        <div className="md-block-right text-right">
                            Rate: {movie.voteAverage}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MovieListItem.propTypes = {
    size: PropTypes.string,
    onMovieSelect: PropTypes.func.isRequired,
    movie: PropTypes.instanceOf(Movie)
}


export default MovieListItem;