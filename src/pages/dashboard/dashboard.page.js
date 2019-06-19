import React, { Component } from 'react';
import { getNowPlayingMoviesPaged, searchMovie } from '../../services/httpActions.service';
import MovieListContainer, { FETCH_TYPES } from '../../components/movie-list-container/movieListContainer.component'
import Header from '../../components/header/header.component';

class DashBoardPage extends Component {

    state = {
        movieQuery: '',
        isSearchView: false
    }

    handleOnQueryChange = (movieQuery) => {

        const isSearchView = movieQuery != null && movieQuery !== "";

        this.setState({ movieQuery, isSearchView });
    }


    handleOnScroll = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            if (this.movieList && typeof this.movieList.getNextPage === "function") {
                this.movieList.getNextPage()
            }
        }
    }

    renderSearchResults = () => {
        const { movieQuery } = this.state;
        return (
            <React.Fragment>
                <div className="md-container no-gutters">
                    <div className="md-sub-title">
                        Search for <i>'{movieQuery}'</i>
                    </div>
                </div>
                <MovieListContainer
                    fetchType={FETCH_TYPES.SEARCH}
                    fetchFunc={searchMovie}
                    fetchParams={{ query: movieQuery }}
                    onRef={ref => (this.movieList = ref)}></MovieListContainer>
            </React.Fragment>)
    }

    renderNowPlaying = () => {
        return (
            <React.Fragment>
                <div className="md-container no-gutters">
                    <div className="md-sub-title">Now In Theaters</div>
                </div>
                <MovieListContainer
                    fetchType={FETCH_TYPES.NOW_PLAYING}
                    fetchFunc={getNowPlayingMoviesPaged}
                    fetchParams={{}}
                    onRef={ref => (this.movieList = ref)}></MovieListContainer>
            </React.Fragment>
        )
    }

    render() {

        const { isSearchView } = this.state;
        return (
            <div className="md-page-container" onScroll={this.handleOnScroll}>
                <Header onSearchQueryChange={this.handleOnQueryChange}></Header>

                {isSearchView === true ? this.renderSearchResults() : null}
                {isSearchView === false ? this.renderNowPlaying() : null}
            </div>
        )
    }
}

export default DashBoardPage;