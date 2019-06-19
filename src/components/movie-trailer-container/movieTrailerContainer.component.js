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
        trailerToShowIndex: 2,
        canShowMore: false
    }

    componentWillMount() {

        this.setState({ viewState: VIEW_STATES.LOADING })
        getMovieVideos(this.props.movieId).then(
            response => {
                if (response.results && response.results.length === 0) {
                    return this.setState({ viewState: VIEW_STATES.NO_RESULTS })
                }

                let canShowMore;
                if (response.results && response.results.length > this.state.trailerToShowIndex) {
                    canShowMore = true;
                }
                return this.setState({
                    viewState: VIEW_STATES.NORMAL,
                    trailers: response.results,
                    canShowMore
                })
            }
        ).catch(
            error => {
                return this.setState({ viewState: VIEW_STATES.SERVER_ERROR })
            }
        )
    }

    showAll = () => {
        const { trailers } = this.state;
        const newState = {
            canShowMore: false,
            trailerToShowIndex: trailers.length
        }
        this.setState(newState)
    }

    renderLoading = () => {
        //  Preview on ghost movie trailer
        return (
            <MovieTrailer trailer={{}} isGhost={true}></MovieTrailer>
        );
    }


    renderNormal = () => {
        const { trailers, canShowMore, trailerToShowIndex } = this.state;
        return (
            <React.Fragment>

                <div className="movie-trailer-container">
                    {trailers ? trailers.slice(0, trailerToShowIndex).map(trailer => (<MovieTrailer trailer={trailer} key={trailer.id}></MovieTrailer>)) : null}
                </div>
                <div className="md-container">
                    {canShowMore ? (<button className="md-button-primary" onClick={this.showAll}>Show all</button>) : null}
                </div>

            </React.Fragment>


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