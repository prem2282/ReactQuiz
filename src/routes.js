import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './mainPage';
import Dataload from './components/header/dataload';

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/dataload" component={Dataload} />    
  </div>

)

export default BaseRouter
