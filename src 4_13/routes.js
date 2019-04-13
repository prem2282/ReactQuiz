import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './mainPage';
import Dataload from './components/header/dataload';
import PayResponse from './components/payment/payResponse';
import MatchType from './components/questions/matchType';

const url = require('url');
let urlDetails = window.location.href;
console.log(urlDetails);

let url_parts = url.parse( urlDetails, true),
  responseData = url_parts.query;
  console.log("url_parts:", url_parts);
  console.log("responseData:", responseData);
console.log(responseData);

const BaseRouter = () => (
  <div>
    <h2>this is a sample text</h2>
    <Route exact path="/" component={MainPage} />
    <Route exact path="/pmp" component={MainPage} />
    <Route exact path="/dataload" component={Dataload} />
    <Route exact path="/payResponse" component={PayResponse} />
    <Route exact path="/matchType" component={MatchType} />
  </div>

)

export default BaseRouter
