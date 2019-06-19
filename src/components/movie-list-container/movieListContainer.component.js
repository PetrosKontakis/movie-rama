import React, { Component } from 'react';

import MovieListItem from '../movie-list-item/movieListItem.component';
import MovieDetails from '../movie-details/movieDetails.component';
import { getNowPlayingMoviesPaged, searchMovie, getMovieSimilar } from '../../services/httpActions.service';


/**
 * Available view states
 */
const VIEW_STATES = {
    SEARCH_VIEW: 0,
    NOW_PLAYING_VIEW: 1,
    SIMILAR_MOVIES_VIEW: 2,
    SERVER_ERROR: 4,
    NO_RESULTS: 5
}

const INITIAL_STATE = {
    viewState: VIEW_STATES.NOW_PLAYING_VIEW,
    loading: false,
    errorMessage: '',
    currentPage: 1,
    totalPages: null,
    totalResults: null,
    query: '',
    similarMovieId: null,
    movies: [],
    selectedMovieIndex: 0,
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

        var newState = this.state;
        if (this.props.similarMovieId) {
            newState['similarMovieId'] = this.props.similarMovieId;
            newState['viewState'] = VIEW_STATES.SIMILAR_MOVIES_VIEW
        }
        this.setState(newState, () => {
            this.getMovies();
        })
    }

    componentWillUnmount() {
        this.props.onRef(null)
    }

    componentWillReceiveProps(nextProps) {



        if (this.state.viewState === VIEW_STATES.SIMILAR_MOVIES_VIEW) {
            return;
        }
        if (nextProps.query != null && nextProps.query !== '') {

            let newState = {

                ...INITIAL_STATE,
                viewState: VIEW_STATES.SEARCH_VIEW,
                query: nextProps.query
            }

            this.setState(newState, () => this.getMovies());
        } else {
            this.setState(INITIAL_STATE, () => this.getMovies());
        }


    }

    // This function execute http request
    getMovies = () => {

        this.setState({ loading: true });

        if (this.state.viewState === VIEW_STATES.SEARCH_VIEW) {
            searchMovie(this.state.query, this.state.currentPage)
                .then(this.handleGetMoviesSuccess)
                .catch(this.handleGetMoviesError)
        } else if (this.state.viewState === VIEW_STATES.SIMILAR_MOVIES_VIEW) {
            getMovieSimilar(this.state.similarMovieId, this.state.currentPage)
                .then(this.handleGetMoviesSuccess)
                .catch(this.handleGetMoviesError)
        } else {
            getNowPlayingMoviesPaged(this.state.currentPage)
                .then(this.handleGetMoviesSuccess)
                .catch(this.handleGetMoviesError)

        }

    }

    handleGetMoviesSuccess = response => {
        const movies = [...this.state.movies, ...response.results];

        let newState = {
            movies,
            loading: false,
            totalResults: response.total_results,
            totalPages: response.total_pages
        };

        if (response.total_results === 0) {
            newState['viewState'] = VIEW_STATES.NO_RESULTS
        }

        this.setState(newState)
    }

    handleGetMoviesError = error => {
        this.setState({
            viewState: VIEW_STATES.SERVER_ERROR,
            loading: false,
            error: error.error
        })
    }

    //  Increase currentPage and execute http getMovies
    getNextPage = () => {
        console.log("getNextPage executed")
        //  Check if exist next page first
        const { totalPages, currentPage } = this.state;
        if (totalPages && currentPage >= totalPages) {
            //  No results to show
            return;
        }
        //  Set currentPage on state and execute getMovies 
        this.setState((state, props) => ({
            currentPage: state.currentPage + 1,
        }), () => {
            this.getMovies();
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

            selectedMovieIndex: this.state.selectedMovieIndex + 1,
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
        if (this.state.selectedMovie !== null) {
            return (
                <MovieDetails
                    count={this.state.selectedMovieIndex}
                    movie={this.state.selectedMovie}
                    starterPosition={this.state.selectedMoviePosition}
                    onMovieDetailsClose={this.deselectMovie}>
                </MovieDetails>
            )
        }
        return null;
    }

    render() {

        const {
            loading,
            movies,
            viewState,
            totalResults,
            query,
            error
        } = this.state;

        // Server error state
        if (viewState === VIEW_STATES.SERVER_ERROR) {
            return (
                <div className="md-container">

                    <div className="md-sub-title">
                        Server Error
                    </div>
                    <p>
                        Message: {error}
                    </p>
                </div>
            )
        }
        // No results state
        if (viewState === VIEW_STATES.NO_RESULTS) {
            return (
                <div className="md-container">

                    <div className="md-sub-title">
                        No results Found...
                    </div>
                    <p>
                        There are no movies that matched your query.
                    </p>
                </div>
            )
        }

        // Normal state
        return (
            <React.Fragment>
                {/* Render selected movie */}
                {this.renderSelectedMovie()}


                <div className="md-container no-gutters">

                    <div className="md-sub-title">
                        {viewState === VIEW_STATES.NOW_PLAYING_VIEW ? 'Now In Theaters' : null}
                        {viewState === VIEW_STATES.SEARCH_VIEW ? (
                            <React.Fragment>
                                Search for '{query}' <i><small>total results: {totalResults}</small></i>
                            </React.Fragment>
                        ) : null}
                    </div>
                </div>
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
                        <div className="clear-fix"></div>
                        {loading ?
                            GRID_LAYOUT_PATTERN.map((size, key) => (
                                <MovieListItem ghostMovie={true} size={size} key={key}></MovieListItem>))
                            : null}
                    </div>
                </div>

                <div className="text-center">
                    <button className="md-button" onClick={this.handleLoadMore}>Loading...</button>
                </div>
            </React.Fragment>

        );
    }
}

export default MovieListContainer;