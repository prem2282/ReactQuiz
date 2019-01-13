import axios from 'axios';
const Insta = require('instamojo-nodejs');


let onBuyNowClick = (paymentData) => {
  // const  user  = 'prem2282'
  // console.log( user );
  console.log("paymentData:", paymentData);

  const body = {
    purpose: paymentData.purpose,
    amount: paymentData.amount,
    buyer_name: paymentData.buyer_name,
    email: paymentData.email,
    user_id: paymentData.userId,
    redirect_url: `https://pmp-quiz-master.herokuapp.com/PayResponse/?user_id=${paymentData.userId}`,
    webhook_url: '/webhook/',
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
  data.webhook= 'http://www.example.com/webhook/';
  data.send_sms= false;
  data.allow_repeated_payments =  false;

  let request= require('request');
  // let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  let targetUrl = 'https://test.instamojo.com/api/1.1/payment-requests/'
  // let dummyUrl = proxyUrl + targetUrl
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
             const redirectUrl = responseData.payment_request.longurl;
             console.log( redirectUrl );
             window.location.href = redirectUrl;
            //  res.status( 200 ).json( redirectUrl );

   }
  })

}
export default onBuyNowClick;
