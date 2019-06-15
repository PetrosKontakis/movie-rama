import React, { Component } from 'react';

import MovieListItem from '../movie-list-item/movieListItem.component';
import MOVIE_LIST from '../../mocs/movieList.moc';

/**
 * 
 * Name: MovieListContainer
 * Description: This Component is responsible for movie list 
 * representation 
 * 
 */
class MovieListContainer extends Component {

    state = {
        isTheaterView: true,
        currentPage: 1,
        movies: [...MOVIE_LIST]
    }

    handleLoadMore = (e) => {
        console.log("load more clicked")
    }

    render() {

        const { movies, isTheaterView } = this.state;
        return (
            <div>

                <div className="movie-list-title">
                    <h4>
                        {isTheaterView ? 'Now In Theaters' : 'Search results'}
                    </h4>
                </div>
                <div className="movie-list-container">
                    {movies.map(
                        (movie) => (
                            <MovieListItem movie={movie} key={movie.id}></MovieListItem>
                        )
                    )}
                </div>

                <div className="">
                    <button onClick={this.handleLoadMore}>load more</button>
                </div>
            </div>
        );
    }
}

export default MovieListContainer;