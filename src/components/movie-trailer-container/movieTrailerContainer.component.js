import React, { Component } from 'react';
import { getMovieVideos } from '../../services/httpActions.service';
import MovieTrailer from '../movie-trailer/movieTrailer.component';
import "./movieTrailerContainer.component.style.scss"

const VIEW_STATES = {
    LOADING: 0,
    SERVER_ERROR: 1,
    NORMAL: 2,
    NO_RESULTS: 3
}

class MovieTrailerContainer extends Component {

    state = {
        viewState: null,
        trailers: null,
        
    }

    componentWillMount() {

        this.setState({ viewState: VIEW_STATES.LOADING })
        getMovieVideos(this.props.movieId).then(
            response => {
                if (response.results && response.results.length === 0) {
                    return this.setState({ viewState: VIEW_STATES.NO_RESULTS })
                }
                return this.setState({ viewState: VIEW_STATES.NORMAL, trailers: response.results })
            }
        ).catch(
            error => {
                return this.setState({ viewState: VIEW_STATES.SERVER_ERROR })
            }
        )
    }

    renderLoading = () => {
        return (<div className="md-paragraph">loading...</div>);
    }

    renderNormal = () => {
        const { trailers } = this.state;
        return (
            <div className="movie-trailer-container">
                {trailers ? trailers.map(trailer => (<MovieTrailer trailer={trailer} key={trailer.id}></MovieTrailer>)) : null}
            </div>
        );
    }

    renderError = () => {
        return (<div className="md-paragraph">Server error</div>);
    }

    renderNoResults = () => {
        return (<div className="md-paragraph">No video trails for this movie</div>);

    }

    render() {
        const { viewState } = this.state
        if (viewState === VIEW_STATES.LOADING) {
            return this.renderLoading();
        }
        if (viewState === VIEW_STATES.NO_RESULTS) {
            return this.renderNoResults();
        }
        if (viewState === VIEW_STATES.SERVER_ERROR) {
            return this.renderError();
        }
        if (viewState === VIEW_STATES.NORMAL) {
            return this.renderNormal();
        }
        return;
    }
}

export default MovieTrailerContainer;