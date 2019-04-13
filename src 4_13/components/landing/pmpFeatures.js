import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import {Animated} from 'react-animated-css';
import './landing.css';

const pmpFeatures = (props) => {

 let outerText = [
   "What can you expect?",
   "What can you expect?",
   "What can you expect?",
   "What can you expect?",
   "What can you expect?",
   "What can you expect?",
   "What can you expect?",
   "What can you expect?",
 ]
 let innerText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


  return (




    <div className='outerGrid'>

        {outerText.map((item,i) => {
          return(
            <div className='outerBox'>
              <div className='innerBox1'>
                <p className='innerText1'>{item}</p>
              </div>
              <div className='innerBox2'>
                <p className='innerText2'>{innerText}</p>
              </div>
            </div>
          )
        })}

    </div>

  )

}

export default pmpFeatures
