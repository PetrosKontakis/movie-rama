import React, { Component } from 'react';
import MovieListContainer from '../../components/movie-list-container/movieListContainer.component'
import Header from '../../components/header/header.component';

class DashBoardPage extends Component {

    state = {
        movieQuery: ''
    }

    handleOnQueryChange = (movieQuery) => {
        this.setState({ movieQuery });
    }

    handleOnScroll = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            if (this.movieList) {
                this.movieList.getNextPage()
            }
        }
    }

    render() {

        const { movieQuery, pageScrolledToBottom } = this.state;
        return (
            <div className="md-page-container" onScroll={this.handleOnScroll}>
                <Header onSearchQueryChange={this.handleOnQueryChange}></Header>
                <MovieListContainer onRef={ref => (this.movieList = ref)} query={movieQuery}></MovieListContainer>
            </div>
        )
    }
}

export default DashBoardPage;