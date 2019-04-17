import React, {Component} from 'react';
import './header.css';
import {Affix, Avatar,Popover, Icon, Button, Tag} from 'antd';
import Countdown from 'react-countdown-now';
import Typing from 'react-typing-animation';
import {Animated} from 'react-animated-css';

class headerPMP extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  logout = () => {
    this.props.logOutButton();
  }

  cancel = (e) => {

  }

  render() {

    let logOut = this.logOut;
    let userName = "Guest";
    let userPic = null;
    let userLoggedIn = false;
    let userEmail = null;
    if (this.props.profile) {
      userName = this.props.profile.userName;
      userPic = this.props.profile.imageUrl;
      userEmail = this.props.profile.userEmail;
      userLoggedIn = true;

    }

    const guestContent = (
      <div>
        <Tag color="DimGray">Login with Google</Tag>
        <Tag color="DodgerBlue">Login with Facebook</Tag>
      </div>
    )
    const userContent = (
      <div>
        <p>Email : {userEmail}</p>
        <Tag color="#f50" onClick={this.props.logOutButton}>Sign Off</Tag>
      </div>
    )

    return(
      <div className="grid-container">
        {/* <div>
          <Avatar className="avatarBox" onClick={this.props.homeButton} style={{backgroundColor:'LightSlateGray'}} icon="home"/>
        </div> */}
        <div className='iconClass' onClick={this.props.homeButton}>
              <Icon 
                  type="home" />
        </div>

        {/* <div>
          <Avatar className="avatarBox" onClick={this.props.backButton} style={{backgroundColor:'LightSlateGray'}} icon="left"/>
        </div> */}
        <div className='iconClass' onClick={this.props.homeButton}>
              <Icon 
                  type="left" />
        </div>      
        <div>
          <Animated animationIn="flipInY" animationOut="fadeOut" isVisible={true}>
            <p className="headerBoxText">{this.props.headerText}</p>
          </Animated>
        </div>
        <div>
        </div>
        <div>
          {this.props.profile?
            <Popover placement="rightBottom" title={userName} content={userContent} trigger="click">
              <Avatar className='avatarBox' src={this.props.profile.imageUrl}/>
            </Popover>
            :
            <Popover placement="rightBottom" title={userName} content={userContent} trigger="click">
              <Avatar className='avatarBox' style={{backgroundColor:'LightSlateGray'}} icon="user"/>
            </Popover>
          }
        </div>


      </div>
    )

  }

}

export default headerPMP;
