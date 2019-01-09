import React, {Component} from 'react';
import {Button, Tag, Avatar, Popover} from 'antd';
import _ from 'lodash';
import './header.css';
import axios from 'axios';

class dataload extends Component {


    constructor(props) {
      super(props);
      this.state = {
        ProcessArray: null,
        IONameList: null,
        ProcessInput: null,
        ProcessOutput: null,
        ProcessTools: null,
        InputByProcess: null,
        OutputByProcess: null,
        processCounts: null,
        IODescriptions: null,
        processColour: null,
      }
    }

    parseAsArray = (res,constantName) => {

      let filteredArray = _.filter(res.data,
        function(constant) {
          return (
            constant.varName === constantName
          )
        }
      );

      let sortedArray = _.sortBy(filteredArray, ['varSeqNo'])
      let constantValueArray = []
      for (let i = 0; i < sortedArray.length; i++) {

        if (sortedArray[i].varValue) {
          let constantValue = sortedArray[i].varValue.split(',')
          let constantNumValue = constantValue.map((value,i) => {return(Number(value))})
          constantValueArray.push('[' + String(constantNumValue) + ']')
        } else {
          constantValueArray.push('[]')
        }

      }
      constantValueArray = constantValueArray.join(',')
      return(constantValueArray)
    }
    parseConstants = (res,constantName) => {

      let filteredArray = _.filter(res.data,
        function(constant) {
          return (
            constant.varName === constantName
          )
        }
      );

      let sortedArray = _.sortBy(filteredArray, ['varSeqNo'])
      let constantValueArray = []
      for (let i = 0; i < sortedArray.length; i++) {
        constantValueArray.push("'" + sortedArray[i].varValue + "'")
      }
      constantValueArray = constantValueArray.join(',')
      return(constantValueArray)
    }

    parseConstantsAsNum = (res,constantName) => {

      let filteredArray = _.filter(res.data,
        function(constant) {
          return (
            constant.varName === constantName
          )
        }
      );

      let sortedArray = _.sortBy(filteredArray, ['varSeqNo'])
      let constantValueArray = []
      for (let i = 0; i < sortedArray.length; i++) {
        constantValueArray.push( sortedArray[i].varValue)
      }
      constantValueArray = constantValueArray.join(',')
      return(constantValueArray)
    }


    doubleQuotes = (res,constantName) => {

      let filteredArray = _.filter(res.data,
        function(constant) {
          return (
            constant.varName === constantName
          )
        }
      );

      let sortedArray = _.sortBy(filteredArray, ['varSeqNo'])
      let constantValueArray = []
      for (let i = 0; i < sortedArray.length; i++) {
        constantValueArray.push('"' + sortedArray[i].varValue + '"')
      }
      constantValueArray = constantValueArray.join(',')
      return(constantValueArray)
    }


    showConstants = () => {

      let constant = null;
      let targetUrl = 'http://prem2282.pythonanywhere.com/api/Constants/'


      axios.get(targetUrl)
        .then(res => {
          console.log("contants avaialable");
          // let processColour = this.parseConstants(res,'processColour')
          // console.log("case 'processColour': return([" + processColour + "]);");
          //
          // let fontAwesome = this.parseConstants(res,'fontAwesome')
          // console.log("case 'fontAwesome': return([" + fontAwesome + "]);");
          let typeIconList = this.parseConstants(res,'typeIconList')
          console.log("case 'typeIconList': return([" + typeIconList + "]);");
          let typeColorList = this.parseConstants(res,'typeColorList')
          console.log("case 'typeColorList': return([" + typeColorList + "]);");

          // let processCounts = this.parseConstantsAsNum(res,'processCounts')
          // console.log("case 'processCounts': return([" + processCounts + "]);");

          // let ProcessArray = this.parseConstants(res,'ProcessArray')
          // console.log("case 'ProcessArray': return([" + ProcessArray + "]);");

          // let IONameList = this.parseConstants(res,'IONameList')
          // console.log("case 'IONameList': return([" + IONameList + "]);");
          //
          // let ToolsNameList = this.parseConstants(res,'ToolsNameList')
          // console.log("case 'ToolsNameList': return([" + ToolsNameList + "]);");
          //
          // let ProcessInput = this.parseAsArray(res,'ProcessInput')
          // console.log("case 'ProcessInput': return([" + ProcessInput + "]);");
          //
          // let ProcessOutput = this.parseAsArray(res,'ProcessOutput')
          // console.log("case 'ProcessOutput': return([" + ProcessOutput + "]);");
          //
          // let ProcessTools = this.parseAsArray(res,'ProcessTools')
          // console.log("case 'ProcessTools': return([" + ProcessTools + "]);");
          //
          // let InputByProcess = this.parseAsArray(res,'InputByProcess')
          // console.log("case 'InputByProcess': return([" + InputByProcess + "]);");
          //
          // let OutputByProcess = this.parseAsArray(res,'OutputByProcess')
          // console.log("case 'OutputByProcess': return([" + OutputByProcess + "]);");
          //
          // let IODescriptions = this.doubleQuotes(res,'IODescriptions')
          // console.log("case 'IODescriptions': return([" + IODescriptions + "]);");


        })
        .catch(err => {
          console.log("error in getting Constants");
        })

    }
    render() {


      return (

        <div>
            <Button type='danger' onClick={this.showConstants}>Show Constants</Button>
        </div>

      )
    }


}

export default dataload
