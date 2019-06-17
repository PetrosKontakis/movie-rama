import React, { Component } from 'react';

import MovieListItem from '../movie-list-item/movieListItem.component';
import { getNowPlayingMoviesPaged, getGenreList, searchMovie } from '../../services/httpActions.service';



/**
 * Available view states
 */
const VIEW_STATES = {
    SEARCH_VIEW: 0,
    NOW_PLAYING_VIEW: 1,
    SERVER_ERROR: 2
}

const INITIAL_STATE = {
    viewState: VIEW_STATES.NOW_PLAYING_VIEW,
    loading: false,
    errorMessage: '',
    currentPage: 1,
    totalPages: null,
    totalResults: null,
    query: '',
    genreList: [],
    movies: []
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
        this.getMovies();
        this.getGenreList();
    }

    componentWillReceiveProps(nextProps) {


        if (nextProps.query != null) {

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

    getGenreList = () => {
        getGenreList().then((response) => {
            this.setState({ genresList: response.genres })
        })
    }
    // This function execute http request
    getMovies = () => {

        this.setState({ loading: true });

        if (this.state.query) {
            searchMovie(this.state.query, this.state.currentPage)
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
        this.setState({
            movies,
            loading: false,
            totalResults: response.total_results,
            totalPages: response.total_pages
        })
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
    render() {

        const { loading, movies, viewState, genreList, totalResults, query } = this.state;

        return (
            <div className="md-container">

                <div className="movie-list-title">
                    <h4>
                        {viewState === VIEW_STATES.NOW_PLAYING_VIEW ? 'Now In Theaters' : 'Search results'}

                    </h4>
                    <h5>
                        Query: {query}
                        <br />
                        Total results: {totalResults}
                    </h5>
                </div>
                <div className="movie-list-container">
                    {movies.map(
                        (movie, key) => {
                            return (
                                <MovieListItem
                                    size={this.getMovieSizeFromPattern(key)}
                                    movie={movie}
                                    genreList={genreList}
                                    key={movie.id}></MovieListItem>
                            )
                        }
                    )}
                </div>

                {loading ? "loading.." : null}

                <div className="">
                    <button onClick={this.handleLoadMore}>load more</button>
                </div>
            </div>
        );
    }
}

export default MovieListContainer;