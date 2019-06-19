import React, { Component } from 'react';
import './movieListItem.component.style.scss';
import store, { EVENTS } from '../../services/store.service';

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
        const { genre_ids } = this.props.movie;
        const genreNames = genreList.filter((genre) => {
            return genre_ids.includes(genre.id);
        }).map(genre => genre.name);
        this.setState({ genreNames });
    }


    getMovieProps = () => {
        return {
            size: this.props.size,
            overview: this.props.movie.overview,
            imgSrc: `https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`,
            title: this.props.movie.title,
            genre: this.state.genreNames.join(', '),
            releaseDate: this.props.movie.release_date,
            voteAverage: this.props.movie.vote_average
        }
    }


    getOffset = (el) => {
        const rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            right: rect.left + el.offsetWidth,
            bottom: rect.top + el.offsetHeight,
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    }

    render() {

        const {
            size,
            overview,
            imgSrc,
            title,
            genre,
            releaseDate,
            voteAverage } = this.getMovieProps();

        return (
            <div
                className={`mv-masonry-grid mv-masonry-${size}`} title={overview}>
                <div
                    onClick={this.handleCardClick}
                    className={`mv-card  mv-card-${size}`}>
                        <div className="mv-card-poster"
                            style={{ backgroundImage: `url(${imgSrc})` }}>
                        </div>
                        <div className="mv-card-content">
                            <div className="title">
                                {title}
                            </div>
                            <div className="genre">
                                {genre}
                            </div>
                            <div className="overview">
                                {overview}
                            </div>
                        </div>
                        <div className="mv-card-footer">
                            <div className="md-block-left">
                                {releaseDate}
                            </div>
                            <div className="md-block-right text-right">
                                Rate: {voteAverage}
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default MovieListItem;