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

    let url = "https://www.quizmebuddy.com/"
    return(
      <div>
        <FacebookShareButton size={32} url={url} round={true} />
        <GooglePlusShareButton size={32} url={url} round={true} />
        <LinkedinShareButton size={32} url={url} round={true} />
        <TwitterShareButton size={32} url={url} round={true} />
        <WhatsappShareButton size={32} url={url}  round={true} />
      </div>
    )
  }
}

export default shareBar
