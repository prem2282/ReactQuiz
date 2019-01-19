

import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import {Animated} from 'react-animated-css';
import './landing.css';
import Delayed from '../..//components/header/delayed';

 let outerText = [
   "PMP",
  //  "Academics",
  //  "General Knowledge",
 ]

 let innerText = [
   [
     " Are you getting ready for your PMP exam? ",
     " Well ! You are at the right place ! ",
     " Go ahead and try it out. All the best !",
   ]
 ]

class categories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPremiumBox: false,
      showPremiumDetails : false,
    }
  }


  render () {



    return(
        <Animated  animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className='outerCatGrid'>

              {outerText.map((item,i) => {
                return(

                      <div key={i} id={item}  className='outerCatBox'>
                          <p id={item} className='innerCatText1' onClick={this.props.catSelected}>{item}</p>
                          {innerText[i].map((item2,j)  => {
                            return(
                              <p  key={j} id={item2} className='innerCatText2'>{item2}</p>
                            )
                          })}
                      </div>
                )
              })}

          </div>
        </Animated>
    )
  }

}

export default categories
