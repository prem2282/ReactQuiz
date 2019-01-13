
import React, {Component} from 'react';
import {Animated} from 'react-animated-css';
import { Avatar, Input, Button} from 'antd';
import axios from 'axios';

const url = require('url');

class payResponse extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  checkExistingData = (responseData) => {

    let targetUrl = 'http://prem2282.pythonanywhere.com/api/UserPackage/' ;

    axios.get(targetUrl)
    .then(res => {
      console.log('res:', res.data);
      this.addUserPaymentDetails(responseData);



    })
    .catch(err => {
      console.log('err:', err);
    })

  }

  addUserPaymentDetails = (responseData) => {

    console.log(responseData);

    let payment_id = responseData.payment_id;
    let payment_request_id = responseData.payment_request_id;
    let payment_status = responseData.payment_status;
    let user_id= responseData.user_id;
    let paymentGateway = "Instamojo";
    let packageId = 'PMP'
    // let paymentDate = Date.now();

    let moment = require('moment');
    let paymentDate = moment().format();

    let targetUrl = 'http://prem2282.pythonanywhere.com/api/UserPackage/create' ;

    let updated = false;

    console.log('user_id', responseData.user_id);

      axios.post(targetUrl, {
        userId: user_id,
        paymentGateway: paymentGateway,
        packageId: packageId,
        paymentId: payment_id,
        paymentId2: payment_status,
        requestId: payment_request_id,
        paymentDate: paymentDate,
        startDate: paymentDate,
        endDate: paymentDate
      })
      .then(res => {
                  updated = true;
                  localStorage.setItem('payment_id', responseData.payment_id);
                  localStorage.setItem('payment_user', responseData.user_id);
                  window.location.href = "http://localhost:3000"
                  // // this.getUserQuizHistory(localStorage.userId);
                  // // this.addUserQuizToLocal(userQuizDetails)
                  // if (userQuizDetails.quizStatus == 'Running') {
                  //         this.checkUserForQuiz(userQuizDetails.groupId,'Running');
                  // }

      })
      .catch(err => {
                  console.log("Post Error:",err);
                  updated = false;
      })


  }

  getUrlDetails = () => {

      let urlDetails = window.location.href;
      console.log(urlDetails);

      let url_parts = url.parse( urlDetails, true),
    		responseData = url_parts.query;
      console.log(responseData);

    	if ( responseData.payment_id ) {

        this.checkExistingData(responseData);
        console.log("payment Complete");

    	}


  }

  render () {

    this.getUrlDetails();

    return (
      <div>
        "Thanks for your Purchase"
        // <Button onClick={this.goToMainPage}>Proceed</Button>
      </div>
    )

  }


}

export default payResponse
