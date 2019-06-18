import React, { Component } from 'react';
import MovieReview from '../movie-review/movieReview.component';
import { getMovieReviews } from '../../services/httpActions.service';

const VIEW_STATES = {
    LOADING: 0,
    SERVER_ERROR: 1,
    NORMAL: 2,
    NO_RESULTS: 3
}

class MovieReviewContainer extends Component {

    state = {
        viewState: null,
        reviews: null
    }

    componentWillMount() {

        this.setState({ viewState: VIEW_STATES.LOADING });
        getMovieReviews(this.props.movieId).then(
            response => {
                if (response.total_results > 0) {
                    this.setState({ viewState: VIEW_STATES.NORMAL, reviews: response.results })
                }
                else {
                    this.setState({ viewState: VIEW_STATES.NO_RESULTS })
                }
            }
        ).catch(
            error => {
                console.log(error)
                this.setState({ viewState: VIEW_STATES.SERVER_ERROR });
            }
        )
    }


    renderLoading = () => {
        return (
            <div className="md-paragraph">
                loading...
            </div>
        )
    }

    renderError = () => {
        return (
            <div className="md-paragraph">
                Server error..
            </div>
        )
    }

    renderNoResults = () => {
        return (
            <div className="md-paragraph">
                No reviews found for this movie,
            </div>
        )
    }

    renderNormal = () => {
        const { reviews } = this.state;
        return (
            <React.Fragment>
                {reviews ? reviews.map(review => (
                    <MovieReview key={review.id} review={review}></MovieReview>)
                ) : null}
            </React.Fragment>
        )
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
    }
}

export default MovieReviewContainer;