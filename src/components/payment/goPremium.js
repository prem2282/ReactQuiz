import React, {Component} from 'react';
import {Avatar, Modal} from 'antd';
import {Animated} from 'react-animated-css';

class goPremium extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Modal
        className = "modalStyle"
        visible={this.props.visible}
        title="Go Primium"
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
      >
        <h2> xxx </h2>
      </Modal>
    )
  }

}

export default goPremium
