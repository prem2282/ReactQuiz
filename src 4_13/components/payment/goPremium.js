import React, {Component} from 'react';
import {Avatar, Modal, Icon} from 'antd';
import {Animated} from 'react-animated-css';
import PaymentProcess from '../..//components/payment/paymentProcess';

class goPremium extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      showWaitPage : false,
    })
  }

  proHandleOk = () => {
    console.log('this.props.userProfile',this.props.userProfile);
    let paymentData = {
      userId: this.props.userProfile.userId,
      packageId: 'PMP',
      purpose: 'Premium Package',
      amount: '100',
      buyer_name: this.props.userProfile.userName,
      email: this.props.userProfile.userEmail,
    }
    this.setState({
      showWaitPage : true,
    })

    PaymentProcess(paymentData);


  }
  render () {
    return (
      <div>
        {this.state.showWaitPage?
        <Modal
          className = "modalStyle"
          visible={this.props.visible}
          title="Go Primium"
          onOk={this.proHandleOk}
          onCancel={this.props.handleCancel}
        >
          <h2> Please wait ! </h2>
          <Icon type="sync" style={{fontSize:'40px'}} spin />
        </Modal>
        :
        <Modal
          className = "modalStyle"
          visible={this.props.visible}
          title="Go Primium"
          onOk={this.proHandleOk}
          onCancel={this.props.handleCancel}
        >
          <h2> xxxa </h2>
        </Modal>
        }
      </div>

    )
  }

}

export default goPremium
