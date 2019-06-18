import React, { Component } from 'react';

import DashBoardPage from './pages/dashboard/dashboard.page.js';
/**
 * Name: App
 * Description: App is main component 
 */
class App extends Component {

  render() {

    return (
      <React.Fragment>
        <DashBoardPage></DashBoardPage>
      </React.Fragment>
    );
  }
}

export default App;
