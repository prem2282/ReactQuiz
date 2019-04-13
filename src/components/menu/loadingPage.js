import React, {Component} from 'react';
import {Animated} from 'react-animated-css';
import { Icon } from 'antd';
import './loading.css'


class loadingPage extends Component {

  constructor (props) {
    super(props);

    this.state = {
    }
  }


  render() {

    return (
      <div className = "loadingContainer">
        <Animated animationIn="zoomIn" animationOut="zoomOut" isVisible={true}>
          <h2 className="loadingText1">Welcome To QuizMeBuddy</h2>
          <h3 className="loadingText2">Loading...</h3>
          <div className="loadingText3">
            <Icon type="sync" spin />
          </div>

        </Animated>
      </div>
    )

  }


}

export default loadingPage
