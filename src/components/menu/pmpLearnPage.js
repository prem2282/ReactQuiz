import React, {Component} from 'react';
import {Affix, Collapse, Avatar, Icon, Button, Tag} from 'antd';
// import './menuPage.css'
import './pmpStyles.css'
import {Animated} from 'react-animated-css';
import _ from 'lodash';
import pmpPhaseMapping from '../..//components/constants/pmpPhaseMapping';
import pmpTypeMapping from '../..//components/constants/pmpTypeMapping';
import PMPConstants from '../..//components/constants/pmpConstants';
import Delayed from '../..//components/header/delayed';
import Header from '../..//components/header/headerPMP';
import Slide from 'react-reveal/Slide';


// import Header from '../..//components/header/headerPMP';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faListAlt, faHandPointRight, faThermometerHalf, faPuzzlePiece, faFlagCheckered, faFileAlt, faSearch, faWrench, faFileSignature, faGripVertical, faUsersCog, faCalendarAlt, faCalendarCheck, faCalendarPlus, faCommentDollar, faDollarSign, faFileInvoiceDollar, faUserMd, faStethoscope, faSyringe, faUserTag, faUsers, faUserGraduate, faUserTie, faAddressBook, faCommentDots, faShareAlt, faHandsHelping} from '@fortawesome/free-solid-svg-icons';
import {faFileMedicalAlt, faFileMedical, faBomb, faChartLine, faChartBar, faFilePrescription, faBinoculars, faTags, faShoppingCart, faHandHoldingUsd, faArchive} from '@fortawesome/free-solid-svg-icons';


const phaseList = ['I','P','E','M','C']
const typeList = ['I','S','T','C','Q','H','CM','R','P'];
const typeIconList = ['dashboard','filter_tilt_shift','schedule','attach_money','verified_user','people','chat','priority_high','shopping_cart'];
const typeColorList = ['Wheat','RosyBrown','GreenYellow','Gold','LightSteelBlue','Orange','PaleVioletRed','Red','Khaki'];

const Panel = Collapse.Panel;

const ProcessArray = PMPConstants('ProcessArray');
const processCounts = PMPConstants('processCounts');
const ProcessIndex = PMPConstants('ProcessIndex');
const IONameList = PMPConstants('IONameList');
const IODescriptions = PMPConstants('IODescriptions');
const processColour = PMPConstants('processColour');
const ProcessInput = PMPConstants('ProcessInput');
const ProcessOutput = PMPConstants('ProcessOutput');
const ProcessTools = PMPConstants('ProcessTools');
// const InputByProcess = PMPConstants('InputByProcess');
// const OutputByProcess = PMPConstants('OutputByProcess');
const ToolsNameList = PMPConstants('ToolsNameList');



const fontIcon = [
  <FontAwesomeIcon icon={faListAlt}/>,
  <FontAwesomeIcon icon={faListAlt}/>,
  <FontAwesomeIcon icon={faHandPointRight}/>,
  <FontAwesomeIcon icon={faThermometerHalf}/>,
  <FontAwesomeIcon icon={faPuzzlePiece}/>,
  <FontAwesomeIcon icon={faFlagCheckered}/>,
  <FontAwesomeIcon icon={faFileSignature}/>,
  <FontAwesomeIcon icon={faFileAlt}/>,
  <FontAwesomeIcon icon={faFileAlt}/>,
  <FontAwesomeIcon icon={faSearch}/>,
  <FontAwesomeIcon icon={faWrench}/>,
  <FontAwesomeIcon icon={faFileSignature}/>,
  <FontAwesomeIcon icon={faGripVertical}/>,
  <FontAwesomeIcon icon={faUsersCog}/>,
  <FontAwesomeIcon icon={faCalendarAlt}/>,
  <FontAwesomeIcon icon={faCalendarCheck}/>,
  <FontAwesomeIcon icon={faCalendarPlus}/>,
  <FontAwesomeIcon icon={faCommentDollar}/>,
  <FontAwesomeIcon icon={faDollarSign}/>,
  <FontAwesomeIcon icon={faFileInvoiceDollar}/>,
  <FontAwesomeIcon icon={faUserMd}/>,
  <FontAwesomeIcon icon={faStethoscope}/>,
  <FontAwesomeIcon icon={faSyringe}/>,
  <FontAwesomeIcon icon={faUserTag}/>,
  <FontAwesomeIcon icon={faUsers}/>,
  <FontAwesomeIcon icon={faUserGraduate}/>,
  <FontAwesomeIcon icon={faUserTie}/>,
  <FontAwesomeIcon icon={faAddressBook}/>,
  <FontAwesomeIcon icon={faCommentDots}/>,
  <FontAwesomeIcon icon={faShareAlt}/>,
  <FontAwesomeIcon icon={faHandsHelping}/>,
  <FontAwesomeIcon icon={faFileMedicalAlt}/>,
  <FontAwesomeIcon icon={faFileMedical}/>,
  <FontAwesomeIcon icon={faBomb}/>,
  <FontAwesomeIcon icon={faChartLine}/>,
  <FontAwesomeIcon icon={faChartBar}/>,
  <FontAwesomeIcon icon={faFilePrescription}/>,
  <FontAwesomeIcon icon={faBinoculars}/>,
  <FontAwesomeIcon icon={faTags}/>,
  <FontAwesomeIcon icon={faShoppingCart}/>,
  <FontAwesomeIcon icon={faHandHoldingUsd}/>,
  <FontAwesomeIcon icon={faArchive}/>,

]
const quizCount = 10;

class pmpLearnPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuName: 'type1',
      subProcessFontList: null,
      subProcessColourList: null,
      processSelected: null,
      subProcessSelected: null,
      inputList:  null,
      outputList: null,
      toolList: null,
      headerText:  null,
      showOtherInputSideInput: false,
      showOtherOutputSideOutput: false,
      showOtherInputSideOutput: false,
      showOtherOutputSideInput: false,
      learnType: "IO",

    }
  }

  type1Selected = () => {
    this.setState({
      menuName: 'type1',
      learnType: "IO"
    })
  }
  type2Selected = () => {
    this.setState({
      menuName: 'type2',
      learnType: "tools"
    })
  }
  typeClicked = (item) => {
    console.log("typeClicked");
    console.log('ProcessIndex:', ProcessIndex);
    console.log('ProcessArray:', ProcessArray);
    console.log('fontIcon:', fontIcon);
    console.log('processColour:', processColour);
    let startIndex = ProcessIndex[item];
    let endIndex = startIndex + processCounts[item];
    let subProcessList = _.slice(ProcessArray,startIndex,endIndex);
    let subProcessFontList = _.slice(fontIcon,startIndex,endIndex);
    let subProcessColourList = _.slice(processColour,startIndex,endIndex);
    console.log('subProcessList:', subProcessList);
    console.log('subProcessFontList:', subProcessFontList);
    console.log('subProcessColourList:', subProcessColourList);

    this.setState({
      subProcessList: subProcessList,
      subProcessFontList: subProcessFontList,
      subProcessColourList: subProcessColourList,
      processSelected: item,
      subProcessSelected: null,
      menuName: 'process',
    })

  }
  showOtherInputSideInput = () => {
    this.setState({
      showOtherInputSideInput: !this.state.showOtherInputSideInput
    })
  }

  showOtherInputSideOutput = () => {
    this.setState({
      showOtherInputSideOutput: !this.state.showOtherInputSideOutput
    })
  }

  showOtherOutputSideInput = () => {
    this.setState({
      showOtherOutputSideInput: !this.state.showOtherOutputSideInput
    })
  }

  showOtherOutputSideOutput = () => {
    this.setState({
      showOtherOutputSideOutput: !this.state.showOtherOutputSideOutput
    })
  }

  processClicked = (item) => {

    let subProcessSelected = ProcessIndex[this.state.processSelected] + item;

    let inputList = ProcessInput[subProcessSelected];
    let outputList = ProcessOutput[subProcessSelected];
    let toolList = ProcessTools[subProcessSelected];

    this.setState({
      inputList: inputList,
      outputList: outputList,
      toolList: toolList,
      menuName: 'IOT',
      subProcessSelected: subProcessSelected,
    })
  }

  nextButton = () => {
    let menuName = this.state.menuName;
    let processSelected = this.state.processSelected;
    let subProcessSelected = this.state.subProcessSelected;

    if (menuName === 'process') {
      if (processSelected === 0) {
        this.backButton()
      } else {
          processSelected = processSelected + 1;
          this.typeClicked(processSelected);
      }
    }
  }

  backButton = () => {
    let backMenuName = 'front'
    let processSelected = this.state.processSelected;
    let subProcessSelected = this.state.subProcessSelected;

    switch (this.state.menuName) {
      case 'IOT':
        this.typeClicked(this.state.processSelected)
        break;
      case 'process':
        backMenuName = 'type1';
        processSelected = null;
        subProcessSelected = null;

        break;
      case 'type1':
      this.props.backButton();
      // this.setState({
      //   backMenuName: 'front',
      //   processSelected: null,
      //   subProcessSelected: null,
      // })

        break;
      case 'front':
        this.props.backButton();
        break;
      default:

    }

    if (this.state.menuName === 'IOT') {

    } else {
      this.setState({
        menuName: backMenuName,
        processSelected: processSelected,
        subProcessSelected: subProcessSelected,
      })
    }

  }

  callback = () => {
    console.log("clicked");
  }

  render() {

    let headerText = null;
    let processText = pmpTypeMapping(typeList[this.state.processSelected]);
    let subProcessText = ProcessArray[this.state.subProcessSelected];

    if (this.state.menuName === 'process') {
      headerText = processText
    }

    if (this.state.menuName === 'IOT') {
      headerText = processText
    }
    if (this.state.menuName === 'tools') {
      headerText = processText
    }
    if (this.state.menuName === 'type1') {
      headerText = "Select a Process"
    }
    if (this.state.menuName === 'type2') {
      headerText = "Select a Process"
    }
    if (this.state.menuName === 'front') {
      headerText = "Select a Topic"
    }

    return(
      <div>

        <Affix offsetTop={0}>
        <Header
          homeButton={this.props.homeButton}
          logOutButton={this.props.logOutButton}
          backButton={this.backButton}
          pageLoaded="pmpLearnPage"
          profile={this.props.userProfile}
          headerText = {headerText}
          />
      </Affix>
        <div className="pmpCenter">

        <div>

        </div>
        {(this.state.menuName==='front')?
              <div className="pmpContainer">
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                  <div className='processOuterBox' onClick={this.type1Selected}>
                    <i className="material-icons processIcon" >compare_arrows</i>
                    <p className="processText">Inputs & Outputs</p>
                  </div>
                  <div className='processOuterBox' onClick={this.type2Selected}>
                    <i className="material-icons processIcon" >compare_arrows</i>
                    <p className="processText">Tools & Techniques</p>
                  </div>
                </Animated>
              </div>
          :null
        }

        {(this.state.menuName === 'type1')?
          <div className="pmpContainer">
            <div className="processContainter">
              {typeList.map((item,i) => {
                return(
                  <div className="processBoxTop">
                  <Delayed key={item} id={item} waitBeforeShow={i*10}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                      <div className='processOuterBox' onClick={() => this.typeClicked(i)}>
                        <i className="material-icons processIcon" style={{ color:typeColorList[i]}}>{typeIconList[i]}</i>
                        <p className="processText">{pmpTypeMapping(item)}</p>
                      </div>
                    </Animated>
                  </Delayed>
                  </div>
                )
              }
              )}
            </div>
          </div>
          :null
        }
        {(this.state.menuName === 'type2')?
          <div className="pmpContainer">
            <div className="processContainter">
              {typeList.map((item,i) => {
                return(
                  <div className="processBoxTop">
                  <Delayed key={item} id={item} waitBeforeShow={i*10}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                      <div className='processOuterBox' onClick={() => this.typeClicked(i)}>
                        <i className="material-icons processIcon" style={{ color:typeColorList[i]}}>{typeIconList[i]}</i>
                        <p className="processText">{pmpTypeMapping(item)}</p>
                      </div>
                    </Animated>
                  </Delayed>
                  </div>
                )
              }
              )}
            </div>
          </div>
          :null
        }
        {(this.state.menuName === 'process')?
          <div className="pmpContainer">
              {this.state.subProcessList.map((item,i) => {
                return(
                  <Slide bottom>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                      <div className='subProcessContainer' onClick={() => this.processClicked(i)}>
                        <div className='subProcessIcon' style={{color:this.state.subProcessColourList[i]}}>
                            {this.state.subProcessFontList[i]}
                        </div>
                        <p className="subProcessText">{item}</p>
                      </div>
                    </Animated>
                  </Slide>

                )
              }
              )}
          </div>
          :null
        }
        {(this.state.menuName === 'IOT')?
          <div>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
              <p className="subProcessTextHead">{subProcessText}</p>
            </Animated>
            <div className="inputOutputContainer">

              <div className="inputOutputSubContainer">
                <div>

                  <Delayed waitBeforeShow={200}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                      <p className="inputOutputHeader">Inputs</p>
                      <Collapse accordion className="custom" onChange={this.callback}>
                        {this.state.inputList.map((item,i) => {
                          let inputName = <i style={{color:'Khaki'}}>{IONameList[item]}</i>
                          let InputByProcess = PMPConstants('InputByProcess')[item]
                          let OutputByProcess = PMPConstants('OutputByProcess')[item]
                          return(
                            <Panel className="custom" header={inputName} key={i}>
                              <div className="descBox">
                                {PMPConstants('IODescriptions')[item]}
                              </div>
                              <div className="inputOutputBox">
                                {(InputByProcess.length > 0)?
                                  <Tag color='RoyalBlue' onClick={this.showOtherInputSideInput}>Input of Processes</Tag>
                                  :
                                  null
                                }
                                {this.state.showOtherInputSideInput?
                                  <div>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                      {
                                        InputByProcess.map((input,j) => {
                                          return(
                                            <div className="subProcessContainerIO">
                                              <p className="subProcessIOText">{fontIcon[input]}</p>
                                              <p className="subProcessIOText">{ProcessArray[input]}</p>
                                            </div>
                                          )
                                        })
                                      }
                                    </Animated>
                                  </div>
                                :null
                                }
                                {(OutputByProcess.length > 0)?
                                  <Tag color='RoyalBlue' onClick={this.showOtherInputSideOutput}>Output of Processes</Tag>
                                  :
                                  null
                                }
                                {this.state.showOtherInputSideOutput?
                                  <div>
                                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                      {
                                        OutputByProcess.map((input,k) => {
                                          return(
                                            <div className="subProcessContainerIO">
                                              <p className="subProcessIOText">{fontIcon[input]}</p>
                                              <p className="subProcessIOText">{ProcessArray[input]}</p>
                                            </div>
                                          )
                                        })
                                      }
                                    </Animated>
                                  </div>
                                :null
                                }
                              </div>
                            </Panel>
                          )
                        })}
                      </Collapse>
                    </Animated>

                  </Delayed>
                </div>
                <div>
                  <Delayed waitBeforeShow={400}>
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                      <p className="inputOutputHeader">Outputs</p>
                      <div>
                        <Collapse accordion className="custom" style={{backgroundColor:'transparent'}} onChange={this.callback}>
                          {this.state.outputList.map((item,i) => {
                            let inputName = <i style={{color:'Khaki'}}>{IONameList[item]}</i>
                            let InputByProcess = PMPConstants('InputByProcess')[item]
                            let OutputByProcess = PMPConstants('OutputByProcess')[item]
                            return(
                              <Panel className="custom" header={inputName} key={i}>
                                <div className="descBox">
                                  {PMPConstants('IODescriptions')[item]}
                                </div>
                                <div className="inputOutputBox">
                                  {(InputByProcess.length > 0)?
                                    <Tag color='RoyalBlue' onClick={this.showOtherOutputSideInput}>Input of Processes</Tag>
                                    :
                                    null
                                  }
                                  {this.state.showOtherOutputSideInput?
                                    <div>
                                      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        {
                                          InputByProcess.map((input,j) => {
                                            return(
                                              <div className="subProcessContainerIO">
                                                <p className="subProcessIOText">{fontIcon[input]}</p>
                                                <p className="subProcessIOText">{ProcessArray[input]}</p>
                                              </div>
                                            )
                                          })
                                        }
                                      </Animated>
                                    </div>
                                  :null
                                  }
                                  {(OutputByProcess.length > 0)?
                                    <Tag color='RoyalBlue' onClick={this.showOtherOutputSideOutput}>Output of Processes</Tag>
                                    :
                                    null
                                  }
                                  {this.state.showOtherOutputSideOutput?
                                    <div>
                                      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                        {
                                          OutputByProcess.map((input,k) => {
                                            return(
                                              <div className="subProcessContainerIO">
                                                <p className="subProcessIOText">{fontIcon[input]}</p>
                                                <p className="subProcessIOText">{ProcessArray[input]}</p>
                                              </div>
                                            )
                                          })
                                        }
                                      </Animated>
                                    </div>
                                  :null
                                  }
                                </div>
                              </Panel>
                            )
                          })}
                        </Collapse>

                      </div>
                    </Animated>

                  </Delayed>
                </div>
              </div>
            </div>
            <div className="inputOutputContainer">
              <div>
                <Delayed waitBeforeShow={200}>
                  <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <p className="inputOutputHeader">Tools and Techniques</p>
                    <Collapse accordion className="custom" style={{backgroundColor:'transparent'}} onChange={this.callback}>
                      {this.state.toolList.map((item,i) => {
                        let toolName = <i style={{color:'Khaki'}}>{ToolsNameList[item]}</i>
                        return(
                          <Panel className="custom" header={toolName} key={i}>
                            <div className="descBox">
                              {PMPConstants('ToolDescription')[item]}
                            </div>
                          </Panel>
                        )
                      })}
                    </Collapse>
                  </Animated>
                </Delayed>
              </div>
            </div>
          </div>
          :null
        }
        {(this.state.menuName === 'refresh')?
          <div></div>
          :
            null
        }

      </div>
      </div>
    )

  }

}

export default pmpLearnPage
//
// <Delayed waitBeforeShow={200}>
//   <Affix style={{ position: 'absolute', left: 20}} offsetBottom={20}>
//     <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
//       <Button className="submitButton" type="danger" onClick={this.backButton}>
//         <Icon type="double-left" theme="outlined" />
//         Back
//       </Button>
//     </Animated>
//   </Affix>
// </Delayed>
