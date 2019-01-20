import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import {Animated} from 'react-animated-css';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';


class shareBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render () {
    return(
      <div>
        <FacebookShareButton size={32} round={true} />
        <GooglePlusShareButton size={32} round={true} />
        <LinkedinShareButton size={32} round={true} />
        <TwitterShareButton size={32} round={true} />
        <WhatsappShareButton size={32} round={true} />
      </div>
    )
  }
}

export default shareBar
