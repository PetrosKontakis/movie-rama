import React from 'react';

import Header from './header/header.component';
import MovieListContainer from './movie-list-container/movieListContainer.component';


/**
 * Name: App
 * Description: App is main component 
 */
function App() {
  return (
    <React.Fragment>
        <Header></Header>
        <MovieListContainer></MovieListContainer>
    </React.Fragment>
  );
}

export default App;
