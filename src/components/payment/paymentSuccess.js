import React, {Component} from 'react';
import {Animated} from 'react-animated-css';
import { Avatar, Input, Button} from 'antd';
import axios from 'axios';

const url = require('url');

class paySuccess extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  goToMainPage = () => {
    localStorage.removeItem('payment_id');
    localStorage.removeItem('payment_user');
    this.props.goToMainPage()
  }
  render () {

    return (
      <div>
        "Thanks for your Purchase"
        <Button onClick={this.goToMainPage}>Proceed</Button>
      </div>
    )

  }


}

export default paySuccess
