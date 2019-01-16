import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import AdSense from 'react-adsense';
require('disable-react-devtools');

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <BaseRouter/>
              <AdSense.Google
                client='ca-pub-9863004487978817'
                slot='7763046972'
                style={{ display: 'block' }}
                layout='in-article'
                format='fluid'
              />
          </div>
        </Router>
      </div>
    )
  }
}
export default App;
