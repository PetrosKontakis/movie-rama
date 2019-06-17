import React, { Component } from 'react';

import Header from './header/header.component';
import MovieListContainer from './movie-list-container/movieListContainer.component';

/**
 * Name: App
 * Description: App is main component 
 */
class App extends Component {

  state = {
    movieQuery: ''
  }

  handleOnQueryChange = (movieQuery) => {
    this.setState({ movieQuery });
  }


  render() {
    const { movieQuery } = this.state;
    return (
      <React.Fragment>
        <Header onSearchQueryChange={this.handleOnQueryChange}></Header>
        <MovieListContainer query={movieQuery}></MovieListContainer>
      </React.Fragment>
    );
  }
}

export default App;
