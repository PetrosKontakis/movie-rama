import React, { Component } from 'react';

import DashBoardPage from './pages/dashboard/dashboard.page.js';
import {getGenreList} from './services/httpActions.service';
import store, { EVENTS } from './services/store.service';
/**
 * Name: App
 * Description: App is main component 
 */
class App extends Component {

  componentDidMount() {
    getGenreList().then(response => {
      store.emit(EVENTS.GENRE_LIST_RECEIVED, response.genres);
    })
  }

  render() {

    return (
      <React.Fragment>
        <DashBoardPage></DashBoardPage>
      </React.Fragment>
    );
  }
}

export default App;
