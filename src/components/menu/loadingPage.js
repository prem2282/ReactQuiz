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

    return (
      <div className = "menuContainer">
        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={true}>
          <h3 style={{color:"Aqua"}}>Loading...</h3>
          <Icon type="sync" style={{fontSize:'40px'}} spin />
        </Animated>
      </div>
    )

  }


}

export default loadingPage
