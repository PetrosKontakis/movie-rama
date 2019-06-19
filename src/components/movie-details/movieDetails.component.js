import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Movie from '../../services/models/movie.model';
import ElementPosition from '../../services/models/elementPosition.model';


import MovieReviewContainer from '../movie-review-container/movieReviewContainer.component';
import MovieListContainer, { FETCH_TYPES } from '../movie-list-container/movieListContainer.component';
import { getMovieSimilar } from '../../services/httpActions.service';
import MovieTrailerContainer from '../movie-trailer-container/movieTrailerContainer.component';
import backIcon from '../../images/baseline-keyboard_arrow_left-24px.svg'
import './movieDetails.component.style.scss';

const FULL_WIDTH_POSITION = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
}

class MovieDetails extends Component {

    state = {
        position: null,
        starterPosition: null,
        movie: null,
        isFullScreen: false
    }

    timerAnimationIn = null;

    timerAnimationOut = null;

    componentWillMount() {

        this.setState({
            starterPosition: this.props.starterPosition,
            position: this.props.starterPosition,
            movie: this.props.movie

        })

        this.timerAnimationIn = setTimeout(() => this.setState({
            position: new ElementPosition(FULL_WIDTH_POSITION),
            isFullScreen: true
        }))
    }

    componentWillUnmount() {
        //  Clear animation timers
        clearTimeout(this.timerAnimationIn);
        clearTimeout(this.timerAnimationOut);
    }


    handleClose = (e) => {
        this.setState({
            position: this.state.starterPosition,
            isFullScreen: false
        })
        this.timerAnimationOut = setTimeout(() => this.props.onMovieDetailsClose(), 200);

    }

    handleOnScroll = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            if (this.movieList) {
                this.movieList.getNextPage();
            }
        }
    }


    render() {
        const { position, movie, isFullScreen } = this.state;
        const posterCoverSrc = movie.getCover();
        const posterPreviewSrc = movie.getPreviewPoster();
        return (
            <div
                style={position}
                className="mv-details-container">

                <div className="md-page-container" onScroll={this.handleOnScroll}>

                    <div className="mv-details-header">
                        <div className="md-container">
                            <button className="md-button" onClick={this.handleClose}>
                                <img src={backIcon} alt="back" />

                            </button>
                            <div className="mv-details-header-title">
                                {movie.title}
                            </div>
                        </div>
                    </div>
                    <div
                        className="mv-details-poster"
                        style={{ backgroundImage: `url(${posterCoverSrc})` }}>
                    </div>
                    <div className="md-container mv-details-content-card">

                        <div className={`mv-details-movie-content ${isFullScreen ? 'show' : 'hide'}`}>
                            <div className="md-container no-gutters">
                                <div className="poster-preview-container">
                                    <img src={posterPreviewSrc} alt={movie.title} />
                                </div>

                                <div className="md-title">
                                    {movie.title}
                                </div>
                                <div className="md-sub-title">
                                    Overview
                                </div>
                                <div className="md-paragraph">
                                    {movie.overview}
                                </div>

                                <div className="md-paragraph sub-info">
                                    {movie.getHumanDate()}, Rating {movie.voteAverage}
                                </div>


                                <div className="md-sub-title">
                                    Trailers
                                </div>
                                <div className="horizontal-container">
                                    <MovieTrailerContainer movieId={movie.id}></MovieTrailerContainer>
                                </div>
                                <div className="md-sub-title">
                                    Reviews
                                </div>
                                <div>
                                    <MovieReviewContainer movieId={movie.id}></MovieReviewContainer>
                                </div>
                                <div className="md-sub-title">
                                    Similar movies
                                </div>
                            </div>
                            <MovieListContainer
                                fetchType={FETCH_TYPES.SIMILAR_MOVIES}
                                fetchFunc={getMovieSimilar}
                                fetchParams={{ movie_id: movie.id }}
                                onRef={ref => (this.movieList = ref)}></MovieListContainer>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

MovieDetails.propTypes = {
    movie: PropTypes.instanceOf(Movie),
    starterPosition: PropTypes.instanceOf(ElementPosition),
    onMovieDetailsClose: PropTypes.func.isRequired
}

export default MovieDetails;