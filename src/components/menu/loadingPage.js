import React, {Component} from 'react';
import {Animated} from 'react-animated-css';
import { Icon } from 'antd';


class loadingPage extends Component {

  constructor (props) {
    super(props);

    this.state = {
    }
  }


  render() {

    let loadingBody1 = "Prepare for your PMP with more than a thousand questions categorized and presented in way that will suit your perfectly. Practice at your own pace and feel the confidence of getting yourself ready for the big one!"
    let loadingBody2 = "What are you waiting for? Login with your Google or Facebook account and explore!"
    return (
      <div className = "menuContainer">
        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={true}>
          <h3 style={{color:"Aqua"}}>Welcome To Quiz Me Buddy</h3>
          <h3 style={{color:"Aqua"}}>Loading...</h3>
          <Icon type="sync" style={{fontSize:'40px'}} spin />
          <h2 style={{color:"Aqua"}}>{loadingBody1}</h2>
          <h2 style={{color:"Aqua"}}>{loadingBody2}</h2>
        </Animated>
      </div>
    )

  }


}

export default loadingPage
