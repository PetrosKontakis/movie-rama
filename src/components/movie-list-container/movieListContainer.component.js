import React, { Component } from 'react';

import MovieListItem from '../movie-list-item/movieListItem.component';
import { getNowPlayingMoviesPaged, getGenreList } from '../../services/httpActions.service';

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
    genreList: [],
    movies: []
}

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

    getGenreList = () =>{
        getGenreList().then((response)=> {
            this.setState({genresList: response.genres})
        })
    }
    // This function execute http request
    getMovies = () => {
        this.setState({ loading: true });
        getNowPlayingMoviesPaged(this.state.currentPage)
            .then((response) => {
                const movies = [...this.state.movies, ...response.results];
                this.setState({
                    movies,
                    loading: false,
                    totalPages: response.total_pages
                })
            })
            .catch((error) => {
                this.setState({
                    viewState: VIEW_STATES.SERVER_ERROR,
                    loading: false,
                    error: error.error
                })
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


    render() {

        const { loading, movies, viewState, genreList } = this.state;
        return (
            <div>

                <div className="movie-list-title">
                    <h4>
                        {viewState === VIEW_STATES.NOW_PLAYING_VIEW ? 'Now In Theaters' : 'Search results'}
                    </h4>
                </div>
                <div className="movie-list-container">
                    {movies.map(
                        (movie) => (
                            <MovieListItem movie={movie} genreList={genreList} key={movie.id}></MovieListItem>
                        )
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