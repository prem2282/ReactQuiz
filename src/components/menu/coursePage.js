import React, {Component} from 'react';
import {Icon, Button} from 'antd';
import './menuPage.css'
import {Animated} from 'react-animated-css';

class coursePage extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    return(
      <div className="menuContainer">

        <Button className="menuItem" onClick={this.props.pmpQuiz} ghost> Take Quiz </Button>
        <Button className="menuItem" onClick={this.props.pmpLearn}  ghost> Learn Inputs, Outputs and Tools </Button>

      </div>
    )

  }

}

export default coursePage
