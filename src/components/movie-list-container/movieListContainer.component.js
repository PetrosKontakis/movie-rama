import React, { Component } from 'react';
import PropTypes from 'prop-types';


import MovieListItem, { MovieListItemGhost } from '../movie-list-item/movieListItem.component';
import MovieDetails from '../movie-details/movieDetails.component';
import Movie from '../../services/models/movie.model';

// Export fetch types
export const FETCH_TYPES = {
    SEARCH: 'SEARCH',
    NOW_PLAYING: 'NOW_PLAYING',
    SIMILAR_MOVIES: 'SIMILAR_MOVIES',
}

/**
 * Available view states
 */
const VIEW_STATES = {
    NORMAL_VIEW: 0,
    LOADING: 1,
    SERVER_ERROR: 4,
    NO_RESULTS: 5
}

/**
 * Inital state
 */
const INITIAL_STATE = {
    viewState: VIEW_STATES.NOW_PLAYING_VIEW,
    currentPage: 1,
    totalPages: null,
    totalResults: null,
    query: '',
    similarMovieId: null,
    movies: [],
    selectedMovie: null,
    selectedMoviePosition: null

}

const GRID_LAYOUT_PATTERN = [
    'lg',
    'sm',
    'sm',
    'sm',
    'sm',
    'sm',
    'md'
];

/**
 * 
 * Name: MovieListContainer
 * Description: This Component is responsible for movie list 
 * representation 
 * 
 */

 
class MovieListContainer extends Component {


    //  Set up initial state
    state = INITIAL_STATE;



    // On component mount execute http request
    componentDidMount() {
        this.props.onRef(this)
        this.fetchDate();
    }

    componentWillUnmount() {
        this.props.onRef(null)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(INITIAL_STATE, () => this.fetchDate());
    }

    // This function execute http request
    fetchDate = () => {

        this.setState({ viewState: VIEW_STATES.LOADING });
        const params = { ...this.props.fetchParams, page: this.state.currentPage }
        this.props.fetchFunc(params)
            .then(this.handleFetchSuccess)
            .catch(this.handleFetchError)


    }

    handleFetchSuccess = response => {

        if (response.total_results === 0) {
            return this.setState({ viewState: VIEW_STATES.NO_RESULTS })
        }

        const movies = [
            ...this.state.movies, 
            ...response.results.map(res=> new Movie(res))];

        this.setState({
            movies,
            totalResults: response.total_results,
            totalPages: response.total_pages,
            viewState: VIEW_STATES.NORMAL_VIEW
        })
    }

    handleFetchError = error => {
        this.setState({
            viewState: VIEW_STATES.SERVER_ERROR
        })
    }

    //  Increase currentPage and execute http fetchDate
    getNextPage = () => {

        //  Check if exist next page first
        const { totalPages, currentPage } = this.state;
        if (totalPages && currentPage >= totalPages) {
            //  No results to show
            return;
        }
        //  Set currentPage on state and execute fetchDate 
        this.setState((state, props) => ({
            currentPage: state.currentPage + 1,
        }), () => {
            this.fetchDate();
        })
    }

    // Handle load more movies
    handleLoadMore = (e) => {
        this.getNextPage();
    }

    getMovieSizeFromPattern = (index) => {
        const quotient = (index % GRID_LAYOUT_PATTERN.length);
        return GRID_LAYOUT_PATTERN[quotient];
    }

    onMovieSelect = (movie, moviePosition) => {
        this.setState({
            selectedMovie: movie,
            selectedMoviePosition: moviePosition
        })
    }

    deselectMovie = () => {
        this.setState({
            selectedMovie: INITIAL_STATE.selectedMovie,
            selectedMoviePosition: INITIAL_STATE.selectedMoviePosition
        })
    }

    renderSelectedMovie = () => {
        const { selectedMovie, selectedMoviePosition } = this.state;
        if (selectedMovie !== null) {
            return (
                <MovieDetails
                    movie={selectedMovie}
                    starterPosition={selectedMoviePosition}
                    onMovieDetailsClose={this.deselectMovie}>
                </MovieDetails>
            )
        }
        return null;
    }

    renderGhostLoading = (isLoading) => {
        if (isLoading) {
            return (GRID_LAYOUT_PATTERN.map((size, key) => (
                <MovieListItemGhost key={key}></MovieListItemGhost>))
            )
        }
        return null;
    }
    
    renderNormal = (isLoading) => {

        const { movies } = this.state;

        return (
            <React.Fragment>

                {this.renderSelectedMovie()}

                <div className="md-container no-gutters">
                    <div className="md-list">
                        {movies.map(
                            (movie, key) => {
                                return (
                                    <MovieListItem
                                        onMovieSelect={this.onMovieSelect}
                                        size={this.getMovieSizeFromPattern(key)}
                                        movie={movie}
                                        key={key}></MovieListItem>
                                )
                            }
                        )}

                        {this.renderGhostLoading(isLoading)}


                        <div className="clear-fix"></div>
                    </div>
                </div>
                {isLoading ? (<div className="text-center">
                    <button className="md-button" onClick={this.handleLoadMore}>Loading...</button>
                </div>) : null}

            </React.Fragment>

        );
    }
    renderServerError = () => {
        return (
            <div className="md-container no-gutters">
                <div className="md-paragraph">
                    Server Error! Something went wrong. Please try again later..
                </div>
            </div>
        )
    }
    renderNoResults = () => {
        return (
            <div className="md-container no-gutters">
                <div className="md-paragraph">
                    No results Found...
                </div>
            </div>
        )
    }


    render() {

        const { viewState } = this.state;

        // Server error state
        if (viewState === VIEW_STATES.SERVER_ERROR) {
            return this.renderServerError()
        }
        // No results state
        if (viewState === VIEW_STATES.NO_RESULTS) {
            return this.renderNoResults();
        }

        // Normal state
        return this.renderNormal(viewState === VIEW_STATES.LOADING);
    }
}

MovieListContainer.propTypes = {
    fetchType: PropTypes.string,
    fetchFunc: PropTypes.func.isRequired,
    fetchParams: PropTypes.object
}


export default MovieListContainer;