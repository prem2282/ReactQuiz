import React, {Component} from 'react';
import {Avatar, Modal} from 'antd';
import {Animated} from 'react-animated-css';
import PaymentProcess from '../..//components/payment/paymentProcess';

class goPremium extends Component {

  constructor(props) {
    super(props);
  }

  proHandleOk = () => {
    let paymentData = {
      userId: this.props.userProfile.userId,
      packageId: 'PMP',
      purpose: 'Premium Package',
      amount: '100',
      buyer_name: this.props.userProfile.userName,
      email: this.props.userProfile.userEmail,
    }
    PaymentProcess(paymentData);

  }
  render () {
    return (
      <Modal
        className = "modalStyle"
        visible={this.props.visible}
        title="Go Primium"
        onOk={this.proHandleOk}
        onCancel={this.props.handleCancel}
      >
        <h2> xxxa </h2>
      </Modal>
    )
  }

}

export default goPremium
