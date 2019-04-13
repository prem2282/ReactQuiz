import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import {Animated} from 'react-animated-css';
import Slide from 'react-reveal/Slide';
import './landing.css';
import Delayed from '../..//components/header/delayed';


 let outerText = [
   " Access to 1000+ questions",
   " Categorization",
   " Compact Quiz sets",
   " Simulation of Exam",
   " Voice enabled quiz",
   " Report Card",
   " Formula based prolems",
   " Detailed explanation of problems",
   " Dynamic question generation",
   " Review completed Quiz anytime",
   " Continue incomplete Quiz",
   " Easy Progress tracking",
   " Create your own quiz",
 ]

 let innerText = [
   " We have an excellent and large collection of questions for the PMP aspirants. There are over 1000 questions spread across various categories for you to master one by one",
   " The questions are categorized based by different phases of the project life cycle, different process groups and general soft skills. There is also a separate section for the Formula driven Mathematical problems",
   " All our questions under various categories are split into compact set of 10 questions per quiz. It takes no more than 5 minutes to complete one. We bet you sure will feel satisfied and motivated to complete all ",
   " It all boils down to how you perform on the real test. Don't worry we have the mock exam simulation for you to attempt any number of times. Every time, the questions will be randomly picked as per the weightage of each section",
   " Would you mind if some one reads the question for you? Certainly that’s a cool way to take a quiz. Yes, our quizzes are voice enabled. You will, for sure to love this!",
   " See how you did in our Report card section. You can retake the same quiz to ensure you make it 100%. Afterall, our objective is to make you 100% in every section",
   " Formula driven questions are always a challenge. We have a separate section dedicated for this" ,
   " For each of Mathematical problems, you will see clear and step by step explanation at the end",
   " You can attempt the mathematical problems any number of times and every time you will not see the same parameters. Its dynamic, so you have to work it out. Isn't it a great way to practice?",
   " All your completed quizzes are available for your review later. This will help you hunt the difficult ones and master them",
   " If you wish to stop a quiz in the middle and take it later, no worries, we will save it for you!",
   " As all your progress is saved, you will easily be able to track your progress and feel accomplished.",
   " You can add attempted questions to your favorites and take your quiz on them later. It helps you not to miss any stone unturned"
 ]
 //
 // let innerText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 //

class features extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPremiumBox: false,
      showPremiumDetails : false,
    }
  }

  pmpFeaturesRender = () => {
    return(
      <Delayed waitBeforeShow={1500}>
        <Animated  animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className='featuresHeader'>
            <h2 className="featuresHeaderText">Features</h2>
          </div>
        </Animated>
        <Animated  animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
          <div className='outerGrid'>

              {outerText.map((item,i) => {
                return(
                    <Slide key={i} id={i} bottom>
                      <div className='outerBox'>
                        <div className='innerBox1'>
                          <p className='innerText1'>{item}</p>
                        </div>
                        <div className='innerBox2'>
                          <p className='innerText2'>{innerText[i]}</p>
                        </div>
                      </div>
                    </Slide>

                )
              })}

          </div>
        </Animated>
      </Delayed>
    )

  }

  render () {

    if (this.props.toDisplay === 'PMP') {
      return(
        this.pmpFeaturesRender()
      )
    } else {
      return(
        this.pmpFeaturesRender()
      )
    }


  }

}

export default features
