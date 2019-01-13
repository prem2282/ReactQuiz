import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './mainPage';
import Dataload from './components/header/dataload';
import PayResponse from './components/payment/payResponse';

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/dataload" component={Dataload} />
    <Route exact path="/payResponse" component={PayResponse} />        
  </div>

)

export default BaseRouter
