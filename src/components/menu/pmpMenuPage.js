import React, {Component} from 'react';
import {Affix, Icon, Button, Tag} from 'antd';
import './menuPage.css';
import './pmpStyles.css';
import {Animated} from 'react-animated-css';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import Delayed from '../..//components/header/delayed';
import Header from '../..//components/header/headerPMP';
import GoPremium from '../..//components/payment/goPremium';
import {faFileSignature, faCalendarAlt, faHandPointRight, faBinoculars, faArchive} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import pmpPhaseMapping from '../..//components/constants/pmpPhaseMapping';
import pmpTypeMapping from '../..//components/constants/pmpTypeMapping';

const phaseList = ['I','P','E','M','C']
const typeList = ['I','S','T','C','Q','H','CM','R','P'];
const typeIconList = ['dashboard','filter_tilt_shift','schedule','attach_money','verified_user','people','chat','priority_high','shopping_cart']
const typeColorList = ['Wheat','RosyBrown','GreenYellow','Gold','LightSteelBlue','Orange','PaleVioletRed','Red','Khaki']
let quizCount = 5;

const phaseFontList = [
  <FontAwesomeIcon icon={faFileSignature}/>,
  <FontAwesomeIcon icon={faCalendarAlt}/>,
  <FontAwesomeIcon icon={faHandPointRight}/>,
  <FontAwesomeIcon icon={faBinoculars}/>,
  <FontAwesomeIcon icon={faArchive}/>,

]

const phaseColorList = [
  "Wheat","RosyBrown","GreenYellow","Gold","LightSteelBlue"
]

class pmpMenuPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      menuName: 'front',
      phaseCounts: [],
      typeCounts: [],
      mathTypeCounts: [],
      mathTotalCount: null,
      mathSelected: false,
      generalSelected: false,
      selectedPhase: null,
      selectedType: null,
      setList: [],
      setNameList: [],
      setCountList: [],
      statusList:[],
      scoreList:[],
      showPremiumBox: false,

    }
  }

  calculateCounts = () => {
    let baseQuizSet = this.props.baseQuizSet;
    let phaseCounts = [];
    let typeCounts = [];
    let mathTypeCounts = [];


    for (let i = 0; i < phaseList.length; i++) {

      let totalCount = _.filter(baseQuizSet, function(question) { return question.standard === phaseList[i]}).length
      phaseCounts.push(totalCount)

    }
    for (let i = 0; i < typeList.length; i++) {

      let totalCount = _.filter(baseQuizSet, function(question) { return question.subject === typeList[i]}).length
      typeCounts.push(totalCount)

      let mathCount = _.filter(baseQuizSet, function(question) { return question.subject === typeList[i] && question.QuestionType === '5'}).length

      mathTypeCounts.push(mathCount)

    }

    let mathProblems = _.filter(baseQuizSet, function(question) { return question.QuestionType === '5'})
    let mathTotalCount = mathProblems.length

    let generalTopic = _.filter(baseQuizSet, function(question) { return question.subject === 'G'})
    let generalCount = generalTopic.length

    this.setState({
      phaseCounts: phaseCounts,
      typeCounts: typeCounts,
      mathTypeCounts: mathTypeCounts,
      mathTotalCount: mathTotalCount,
      generalCount: generalCount,

    })
  }

  accessForSets = () => {
    let userProfile = this.props.userProfile;
    let userPackage = this.props.userPackage;
    let takenColor = '#383749';
    let savedColor = '#384537';
    let tryItColour = '#222'
    let setHeaderText = [];
    let setHeaderColor = [];
    let setNumberColor = [];
    let setAccess = [true];
    let setBoxColor = [];
    let setBoxOpacity = [];

    if (this.state.statusList[0]==='Completed') {
      setHeaderText.push("Scored " + String(this.state.scoreList[0])+' %');
      if (this.state.scoreList[0]>50) {
        setHeaderColor.push("ForestGreen");
        setNumberColor.push("ForestGreen");
        setBoxColor.push(takenColor);
      } else {
        setHeaderColor.push("FireBrick");
        setNumberColor.push("DarkOrange");
        setBoxColor.push(takenColor);
      }
    } else if (this.state.statusList[0]==='Running') {
        setHeaderText.push('Saved');
        setHeaderColor.push("Teal");
        setNumberColor.push("Aqua");
        setBoxColor.push(savedColor);
    } else {
      setHeaderText.push('Try It');
      setHeaderColor.push("ForestGreen");
      setNumberColor.push("Aqua");
      setBoxColor.push(tryItColour);
    }

    if (userPackage === "PMP") {

      for (let i = 1; i < this.state.setList.length; i++) {
        setAccess.push(true)
        if (this.state.statusList[i]==='Completed') {
          setHeaderText.push("Scored " + String(this.state.scoreList[i])+' %');
          if (this.state.scoreList[i]>50) {
            setHeaderColor.push("ForestGreen");
            setNumberColor.push("ForestGreen");
            setBoxColor.push(takenColor);
          } else {
            setHeaderColor.push("FireBrick");
            setNumberColor.push("DarkOrange");
            setBoxColor.push(takenColor);
          }
        } else if (this.state.statusList[i]==='Running') {
            setHeaderText.push('Saved');
            setHeaderColor.push("Teal");
            setNumberColor.push("Aqua");
            setBoxColor.push(savedColor);
        } else {
          setHeaderText.push('Try It');
          setHeaderColor.push("ForestGreen");
          setNumberColor.push("Aqua");
          setBoxColor.push(tryItColour);
        }
      }

    } else {
        for (let i = 1; i < this.state.setList.length; i++) {
          setAccess.push(false);
          setHeaderText.push('Go Premium');
          setHeaderColor.push('DimGray');
          setNumberColor.push('DimGray');
          setBoxColor.push(tryItColour);
        }

    }

    let setProps = ({
      setHeaderText: setHeaderText,
      setHeaderColor: setHeaderColor,
      setNumberColor: setNumberColor,
      setAccess: setAccess,
      setBoxColor: setBoxColor,
      setBoxOpacity: setBoxOpacity,
    })
    return(setProps);
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
    // PaymentProcess(paymentData);

  }
  proHandleCancel = () => {
    this.setState({
      showPremiumBox: false
    })
  }
  type1Selected = () => {
    this.setState({
      menuName : "type1"
    })
  }
  type2Selected = () => {
    this.setState({
      menuName : "type2"
    })
  }

  phaseClicked = (item) => {

    quizCount = 10;
    let total = this.state.phaseCounts[item];
    let rem = total % quizCount;
    let quo = (total - rem)/quizCount;
    let setList = [];

    let phaseSelected = phaseList[item];
    let setNameList = [];
    let statusList = [];
    let scoreList = [];

    for (let i = 0; i <= quo; i++) {
      let setName = 'PMP-P-' + phaseSelected + '-' + String(i+1);
      setList.push(i+1);
      setNameList.push(setName);
    }

    let setCountList = [];

    for (let i = 0; i < setNameList.length; i++) {
      let startCount = i*quizCount;
      let endCount = i*quizCount + quizCount;
      if (endCount > total) {
        endCount = total
      }
      let setCount = startCount + ' - ' + endCount
      setCountList.push(setCount)
    }

    console.log("this.props.userQuizHistory:",this.props.userQuizHistory);
    for (let i = 0; i < setNameList.length; i++) {
      console.log("setNameList:", setNameList[i]);
      let historySet = _.find(this.props.userQuizHistory, function(o) {return o.groupId === String(setNameList[i])});

      console.log('historySet', historySet);
      let status = null;
      let score = 0;
      if (historySet) {
        status = historySet.quizStatus;
        score = historySet.score;
      }
      statusList.push(status);
      scoreList.push(score);

    }

    this.setState({
      selectedPhase: phaseList[item],
      selectedType: null,
      setList: setList,
      setNameList: setNameList,
      statusList: statusList,
      setCountList: setCountList,
      scoreList: scoreList,
      menuName: 'set'
    })

  }

  typeClicked = (item) => {

    quizCount = 10;
    let total = this.state.typeCounts[item];
    let rem = total % quizCount;
    let quo = (total - rem)/quizCount;
    let setList = [];
    let typeSelected = typeList[item];
    let setNameList = [];
    let statusList = [];
    let scoreList = [];

    for (let i = 0; i <= quo; i++) {
      let setName = 'PMP-T-' + typeSelected + '-' + String(i+1);
      setList.push(i+1);
      setNameList.push(setName);
    }

    for (let i = 0; i < setNameList.length; i++) {

      let historySet = _.find(this.props.userQuizHistory, function(o) {return o.groupId === String(setNameList[i])});
      let status = null;
      let score = 0;
      if (historySet) {
        status = historySet.quizStatus;
        score = historySet.score;
      }
      statusList.push(status);
      scoreList.push(score);

    }

    this.setState({
      selectedPhase: null,
      selectedType: typeList[item],
      setList: setList,
      setNameList: setNameList,
      statusList: statusList,
      menuName: 'set'
    })

  }

  setClickedAllowAccess = (item) => {
    let phaseCounts = this.state.phaseCounts;
    let typeCounts = this.state.typeCounts;
    let selectedPhase = this.state.selectedPhase;
    let selectedType = this.state.selectedType;
    let mathSelected = this.state.mathSelected;
    let generalSelected = this.state.generalSelected;
    let setListClicked = item;

    let total = 0;
    let quizSet = [];
    let groupId = 'PMP-';

    if (selectedPhase) {

      total = this.state.phaseCounts[item];
      quizSet = _.filter(this.props.baseQuizSet, function(question) { return (question.standard === selectedPhase)})
      groupId = groupId + 'P-' + selectedPhase + '-';
    }
    if (selectedType) {
      total = this.state.typeCounts[item];
      quizSet = _.filter(this.props.baseQuizSet, function(question) { return (question.subject === selectedType)})
      groupId = groupId + 'T-' + selectedType + '-';
    }
    if (mathSelected) {
      groupId = groupId + 'M-M-';
      quizSet = _.filter(this.props.baseQuizSet, function(question) { return (question.QuestionType === '5')})

    }
    if (generalSelected) {
      groupId = groupId + 'G-G-';
      quizSet = _.filter(this.props.baseQuizSet, function(question) { return (question.subject === 'G')})

    }

    groupId = groupId + String(setListClicked+1);
    let rem = total % quizCount;
    let quo = (total - rem)/quizCount;
    let startPos = item*quizCount;
    let endPos = startPos + quizCount;

    quizSet = _.slice(quizSet, [startPos], [endPos])
    this.props.setSelected(quizSet, groupId);

  }

  setClickedGoPremium = () => {
    this.setState({
      showPremiumBox: true,
    })
  }

  setClickedSavedQuiz = (groupId) => {
    this.props.reloadQuiz(groupId)
  }

  setClicked = (item,setProps) => {
    if (setProps.setAccess[item]) {
      if (setProps.setHeaderText[item] === 'Saved') {
          this.setClickedSavedQuiz(this.state.setNameList[item])
      } else {
        this.setClickedAllowAccess(item)
      }

    } else {
      this.setClickedGoPremium()
    }
  }

  generalClicked = () => {

        quizCount = 10;
        let total = this.state.generalCount;
        let rem = total % quizCount;
        let quo = (total - rem)/quizCount;
        let setList = [];
        let setNameList = [];
        let statusList = [];
        let scoreList = [];

        for (let i = 0; i <= quo; i++) {
          let setName = 'PMP-G-G' + '-' + String(i+1);
          setList.push(i+1);
          setNameList.push(setName);
        }
        let setCountList = [];
        for (let i = 0; i <= quo; i++) {
          let startCount = i*quizCount;
          let endCount = i*quizCount+quizCount;
          if (endCount > total) {
            endCount = total;
          }
          let setCount = startCount + ' - ' + endCount;
          setCountList.push(setCount);

        }
        for (let i = 0; i < setNameList.length; i++) {

          let historySet = _.find(this.props.userQuizHistory, function(o) {return o.groupId === String(setNameList[i])});
          let status = null;
          let score = 0;
          if (historySet) {
            status = historySet.quizStatus;
            score = historySet.score;
          }
          statusList.push(status);
          scoreList.push(score);

        }

        this.setState({
          fromMenu: false,
          selectedPhase: null,
          selectedType: null,
          generalSelected: true,
          setList:setList,
          setNameList:setNameList,
          setCountList:setCountList,
          statusList:statusList,
          scoreList:scoreList,
          menuName:'set',
        })


  }
  mathClicked = () => {
    quizCount = 5;
    let total = this.state.mathTotalCount;
    let rem = total%quizCount;
    let quo = (total -rem)/quizCount;
    let typeSelected = 'M';
    let setList = [1];
    let setName1 = "PMP-M-" + typeSelected + '-' + 1;
    let setNameList = [];
    setNameList.push(setName1);
    for (let i = 1; i <= quo; i++) {
      setList.push(i+1);
      let setNameNext = "PMP-M-" + typeSelected + '-' + String(i+1);
      setNameList.push(setNameNext);

    }
    let setCountList = [];
    for (let i = 0; i <= quo; i++) {
      let startCount = i*quizCount;
      let endCount = i*quizCount+quizCount;
      if (endCount > total) {
        endCount = total;
      }
      let setCount = startCount + ' - ' + endCount;
      setCountList.push(setCount);

    }
    let statusList = [];
    let scoreList = [];

    for (var i = 0; i < setNameList.length; i++) {
      let historySet = _.find(this.props.userQuizHistory, function(o) {return o.groupId === String(setNameList[i]);});
      let status = null;
      let score = 0;
      if (historySet) {
        status = historySet.quizSet;
        score = historySet.score;
      }
      statusList.push(status);
      scoreList.push(score);
    }

    this.setState({
      fromMenu: false,
      selectedPhase: null,
      selectedType: null,
      mathSelected: true,
      setList:setList,
      setNameList:setNameList,
      setCountList:setCountList,
      statusList:statusList,
      scoreList:scoreList,
      menuName:'set',
    })

  }
  backButton = () => {

    let menuName = this.state.menuName;
    let newMenuName = menuName;

    switch (menuName) {
      case 'type1':
        newMenuName = 'front'
        break;
      case 'type2':
        newMenuName = 'front'
        break;
      case 'front':
        this.props.backButton()
        break;
      case 'set':

        if (this.state.selectedPhase) {
            newMenuName = 'type1'
        } else if (this.state.selectedType) {
            newMenuName = 'type2'
        } else if (this.state.mathSelected) {
            newMenuName = 'front'
        } else if (this.state.generalSelected) {
            newMenuName = 'front'
        }

        break;
      default:

    }

    this.setState({
      menuName: newMenuName,
    })

  }

  componentDidMount() {
    let n = ReactDOM.findDOMNode(this);
    console.log(n.offsetTop);
  }
  componentWillMount () {
    if (this.props.baseQuizSet) {
      this.calculateCounts();
    }
  }

  render() {

    let headerText = "PMP Quiz";

    if (this.state.selectedPhase && this.state.menuName === 'set') {
      headerText = pmpPhaseMapping(this.state.selectedPhase);
    }
    if (this.state.selectedType && this.state.menuName === 'set') {
      headerText = pmpTypeMapping(this.state.selectedType)
    }

    let setProps = null;
    let setHeaderText = null;
    let setHeaderColor = null;
    let setAccess = null;
    let setNumberColor = null;
    let setBoxColor = null;
    let setBoxOpacity = null;

    if (this.state.menuName === 'set') {
       setProps = this.accessForSets();
       setHeaderText = setProps.setHeaderText;
       setHeaderText = setProps.setHeaderText;
       setHeaderColor = setProps.setHeaderColor;
       setAccess = setProps.setAccess;
       setNumberColor = setProps.setNumberColor;
       setBoxColor = setProps.setBoxColor;
       setBoxOpacity = setProps.setBoxOpacity;
    }

    return(

      <div>
        <Affix offsetTop={0}>
        <Header
          homeButton = {this.props.homeButton}
          logOutButton = {this.props.logOutButton}
          backButton = {this.backButton}
          pageLoaded = "pmpMenuPage"
          profile = {this.props.userProfile}
          headerText = {headerText}
        />
      </Affix>
        <div>

        {(this.state.menuName==='front')?
              <div className="coursePageContainer">
                <Animated  animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                  <div className="courseWelcome">
                    <h2 className="courseWelcomeText1">Choose a category</h2>
                    <h3 className="courseWelcomeText2">Quizzes are organized by these categories</h3>
                  </div>
                </Animated>
                  <Animated  animationIn="slideInLeft" animationOut="fadeOut" isVisible={true}>
                    <Button className="courseButton"  onClick={this.type1Selected} >
                        <Icon type="project" style={{color:'LightSteelBlue'}}/>
                        By Project Phases
                    </Button>
                  </Animated>
                  <Animated  animationIn="slideInRight" animationOut="fadeOut" isVisible={true}>
                    <Button className="courseButton"  onClick={this.type2Selected} >
                        <Icon type="experiment" style={{color:'LightSteelBlue'}}/>
                        By Process Groups
                    </Button>
                  </Animated>
                  <Animated  animationIn="slideInLeft" animationOut="fadeOut" isVisible={true}>
                    <Button className="courseButton"  onClick={this.generalClicked} >
                        <Icon type="bulb" style={{color:'LightSteelBlue'}}/>
                        By Soft Skills
                    </Button>
                  </Animated>
                  <Animated  animationIn="slideInRight" animationOut="fadeOut" isVisible={true}>
                    <Button className="courseButton"  onClick={this.mathClicked} >
                        <Icon type="calculator" style={{color:'LightSteelBlue'}}/>
                        Formula based challenges
                    </Button>
                  </Animated>

              </div>
          :null
        }

        {(this.state.menuName==='type1')?
          <div className = "pmpContainer">
            <Animated  animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
              <div className="courseWelcome">
                <h2 className="courseWelcomeText1">By Project Phase</h2>
                <h3 className="courseWelcomeText2">Now choose one of the phases</h3>
              </div>
            </Animated>
            {phaseList.map((item,i) => {
              return(
                <Delayed key={item} id={item} waitBeforeShow={0*100}>
                  <Animated key={item} animationIn="slideInUp" animationOut="fadeOut" isVisible={true}>
                    <Button className="courseButton" onClick={() => this.phaseClicked(i)}>
                      <div style={{color:phaseColorList[i]}}>
                        {phaseFontList[i]} {pmpPhaseMapping(item)}
                      </div>
                    </Button>
                  </Animated>
                </Delayed>

              )
            })}
          </div>
          :null
          }

          {(this.state.menuName==='type2')?
            <div className = "pmpContainer">
              <Animated  animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                <div className="courseWelcome">
                  <h2 className="courseWelcomeText1">By Process Groups</h2>
                  <h3 className="courseWelcomeText2">Now choose one of the groups</h3>
                </div>
              </Animated>
              <div className = "processContainter">

              {typeList.map((item,i) => {
                return(
                  <div className="processBoxTop">
                  <Delayed key={item} id={item} waitBeforeShow={0*100}>
                    <Animated key={item} animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                      <div className="processOuterBox" onClick={() => this.typeClicked(i)}>
                        <i className=" material-icons processIcon " style={{color:typeColorList[i]}}>
                          {typeIconList[i]}
                        </i>
                          <div className="processText">{pmpTypeMapping(item)}</div>
                      </div>
                    </Animated>
                  </Delayed>
                  </div>

                )
              })}
              </div>
            </div>
            :null
            }

        {(this.state.menuName==='set')?
            <div>

              <div className="setContainer">
              
              {this.state.setList.map((item,i) => {
                return(
                  <div className="processBoxTop">
                    <Delayed key={item} id={item} waitBeforeShow={i*100}>
                      <Animated key={i} id={i} animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                        <div className="processOuterBox" style={{backgroundColor:setBoxColor[i]}}
                          onClick={() => this.setClicked(i,setProps)}>
                          <div className="topTag" style={{backgroundColor:setHeaderColor[i]}}>{setHeaderText[i]}</div>
                          <div className="setNumber" style={{color:setNumberColor[i]}}>{item}</div>
                          <div className="bottomTag">{this.state.setCountList[i]}</div>
                          {/* <Tag color={setHeaderColor[i]}>{setHeaderText[i]}</Tag>
                          <p style={{fontSize:48, marginBottom:0, color:setNumberColor[i]}}>{item}</p>
                          <Tag color={"transparent"}>{this.state.setCountList[i]}</Tag> */}
                        </div>
                      </Animated>
                    </Delayed>
                  </div>

                  )
                })}
                </div>
              </div>
          :null
        }
        {this.state.showPremiumBox?
          <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <GoPremium
              visible={this.state.showPremiumBox}
              title="Go Premium"
              handleOk={this.proHandleOk}
              handleCancel={this.proHandleCancel}
              userProfile={this.props.userProfile}
            />
          </Animated>
        :null}

      </div>
      </div>

    )

  }

}

export default pmpMenuPage

// <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
//   <Button className="submitButton" type="danger" onClick={this.backButton}>
//     <Icon type="double-left" theme="outlined" />
//     Back
//   </Button>
// </Animated>
// <div className="pmpContainer">
//   <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={(this.state.menuName==='front')?true:false}>
//     <Button className="menuItem" onClick={this.type1Selected} ghost> By Phases </Button>
//   </Animated>
//   <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={(this.state.menuName==='front')?true:false}>
//     <Button className="menuItem" onClick={this.type2Selected} ghost> By Types </Button>
//   </Animated>
//   <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={(this.state.menuName==='front')?true:false}>
//     <Button className="menuItem" onClick={this.mathClicked} ghost> Math Problems </Button>
//   </Animated>
// </div>

// <div className="subProcessIcon" style={{color:phaseColorList[i]}}>
//   {phaseFontList[i]}
// </div>
//   <p className="subProcessText">{pmpPhaseMapping(item)}</p>
