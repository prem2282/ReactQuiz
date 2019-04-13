import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import {Animated} from 'react-animated-css';
import './landing.css';
import Delayed from '../..//components/header/delayed';
import {GoogleLogin} from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
const clientId = "374998186039-sogtupo8o5aksqq2te2eie0anmm13tst.apps.googleusercontent.com";

class login extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render () {



    return(

      <Delayed waitBeforeShow={1000}>
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

        <div className="landingContainer">


          <div >
            <Animated  animationIn="slideInLeft" animationOut="fadeOut" isVisible={true}>
            <GoogleLogin
              render={renderProps => (
                  <Button className="googleButton"  onClick={renderProps.onClick}><Icon type="google" />Sign with Google</Button>
              )}
               onSuccess={this.props.success} onFailure={this.props.error} clientId={clientId}/>
           </Animated>
          </div>

          <div>
            <Animated  animationIn="slideInDown" animationOut="fadeOut" isVisible={true}>
            <FacebookLogin
              appId="348732972376990"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.props.facebookResp}
              render={renderProps => (
                <Button  className="faceBookButton"  onClick={renderProps.onClick}><Icon type="facebook" />Sign with Facebook</Button>
              )}
            />
          </Animated>
          </div>

          <div>
            <Animated  animationIn="slideInRight" animationOut="fadeOut" isVisible={true}>
              <Button className="guestButton"  onClick={this.props.guestLogin}><Icon type="user" />Continue as Guest</Button>
            </Animated>
          </div>
        </div>

      </Animated>
      </Delayed>
    )
  }

}

export default login
