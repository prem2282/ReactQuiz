import axios from 'axios';
const Insta = require('instamojo-nodejs');

const storeRequestId = (responseData) => {


      let payment_request_id = responseData.payment_request_id;
      let payment_status = responseData.payment_status;
      let user_id= responseData.user_id;
      let paymentGateway = "Instamojo";
      let packageId = 'PMP'
      // let paymentDate = Date.now();

      let moment = require('moment');
      let paymentDate = moment().format();

      let targetUrl = 'https://prem2282.pythonanywhere.com/api/UserPackage/create' ;

      let updated = false;

      console.log('user_id', responseData.user_id);

        axios.post(targetUrl, {
          userId: user_id,
          paymentGateway: paymentGateway,
          packageId: packageId,
          paymentId: 'TBD',
          paymentId2: payment_status,
          requestId: payment_request_id,
          paymentDate: paymentDate,
          startDate: paymentDate,
          endDate: paymentDate
        })
        .then(res => {
                    updated = true;
                    localStorage.setItem('payment_request_id', responseData.payment_request_id);
        })
        .catch(err => {
                    console.log("Post Error:",err);
                    updated = false;
        })


}

let onBuyNowClick = (paymentData) => {
  // const  user  = 'prem2282'
  // console.log( user );
  console.log("paymentData:", paymentData);

  // let redirect_url = window.location.href + 'PayResponse/?user_id=${paymentData.userId}'
  let webhook_url = window.location.href + '/webhook/'
  const body = {
    purpose: paymentData.purpose,
    amount: paymentData.amount,
    buyer_name: paymentData.buyer_name,
    email: paymentData.email,
    user_id: paymentData.userId,
    // redirect_url : redirect_url,
    redirect_url: `https://www.quizmebuddy.com/PayResponse/?user_id=${paymentData.userId}`,
    webhook_url: webhook_url,
  };


  const data = new Insta.PaymentData();
  Insta.setKeys('test_eb938d68b256680e231d865acce', 'test_decaceab671101219bc45291bc1');
  Insta.isSandboxMode(true);

  data.purpose =  body.purpose;
  data.amount =   body.amount;
  data.buyer_name =  body.buyer_name;
  data.redirect_url =  body.redirect_url;
  data.email =  body.email;
  data.phone =  body.phone;
  data.send_email =  false;
  data.webhook= 'https://pmp-quiz-master.herokuapp.com/webhook/';
  data.send_sms= false;
  data.allow_repeated_payments =  false;

  let request= require('request');
  let proxyUrl = 'https://corsheader.herokuapp.com/';
  let targetUrl = 'https://test.instamojo.com/api/1.1/payment-requests/'
      targetUrl = proxyUrl + targetUrl
  //
  // console.log(dummyUrl);
  let headers = { 'X-Api-Key': 'test_eb938d68b256680e231d865acce', 'X-Auth-Token': 'test_decaceab671101219bc45291bc1'}



  request.post(targetUrl, {headers: headers, form : data}, function(error, response, body){
    if(!error && response.statusCode == 200){
      console.log("No error");
      console.log(response);
    }
    else {
             console.log("error:",error);
             console.log("response:",body);
             console.log("body:",body);

             const responseData = JSON.parse( body );
             storeRequestId(responseData);
             const redirectUrl = responseData.payment_request.longurl;
             console.log( redirectUrl );
             window.location.href = redirectUrl;
            //  res.status( 200 ).json( redirectUrl );

   }
  })

}
export default onBuyNowClick;
