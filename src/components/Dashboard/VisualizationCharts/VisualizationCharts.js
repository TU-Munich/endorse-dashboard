import React, {Component} from "react";
import SentimentDoughnutChart from './SentimentDoughnutChart';
import SentimentBarChart from "./SentimentBarChart";
import SentimetLineChart from "./SentimetLineChart";
import styled from 'styled-components';
import Card from "@material-ui/core/Card/Card";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import SentimentAreaChart from "./SentimentAreaChart";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "@material-ui/core/es/Input/Input";
import SentimentRadarChart from "./SentimentRadarChart";
import SimilarityBubbleChart from "./SimilarityBubbleChart";


const OverviewWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  margin: 1px;
`;

const PageTitle = styled.h1`
  text-align: center;
`;
const DivCards = styled.div`
  width: 50%;
  height: 50%;
  display:inline-block;
  padding-right : 15px;
  margin-bottom: 3%;
`;

const FormCont = styled.form`
    margin: theme.spacing.unit;
    padding: 5px;
    fontsize: small;
`;


class VisualizationCharts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      value: 'uploaded',
      amountBar: '5',
      amountDoughnut: '5'
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSelectChange= this.handleSelectChange.bind(this);
    this.handleAmountBarChange= this.handleAmountBarChange.bind(this);
    this.handleAmountDoughnutChange= this.handleAmountDoughnutChange.bind(this);
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEndDateChange(date) {
    this.setState({endDate: date});
  }

  handleSelectChange(event) {
    this.setState({value: event.target.value});
  }

  handleAmountBarChange(event) {
    this.setState({amountBar: event.target.value});
  }

  handleAmountDoughnutChange(event) {
    this.setState({amountDoughnut: event.target.value});
  }


  render() {
    return (
      <OverviewWrapper>
            <PageTitle>
              Project Visualization
            </PageTitle>
            <div style={{width:"60%", backgroundColor:"#fbfbfb", left:"25%", position:"relative"}}>
              <div style={{display:"-webkit-box", paddingLeft:"15px"}}>
                <FormCont>
                  <InputLabel htmlFor="filter_id">Source data: </InputLabel>
                  <Select style={{width:"90px", fontSize:"small"}}
                          value={this.state.value}
                          onChange={this.handleSelectChange}>
                    <MenuItem value={"uploaded"}>Uploaded</MenuItem>
                    <MenuItem value={"crawled"}>Crawled</MenuItem>
                  </Select>
                </FormCont>
                <FormCont style={{marginTop:"1%"}}>
                <InputLabel>From:</InputLabel>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleStartDateChange}/>
                </FormCont>
                <FormCont style={{marginTop:"1%"}}>
                  <InputLabel>To:</InputLabel>
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}/>
                </FormCont>
              </div>
            </div><br/>

            <DivCards>
              <Card>
                <CardMedia style={{backgroundColor:"#fbfbfb"}} image={""}>
                  <SentimentBarChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                  <CardContent style={{fontSize:"medium"}}>
                    Document Name Entity Recognition:
                    <div style={{display:"-webkit-box"}}>
                    <FormCont>
                      <InputLabel style={{fontSize:"small"}}>Amount: </InputLabel>
                      <Select style={{width:"40%", fontSize:"small"}}
                              value={this.state.amountBar}
                              onChange={this.handleAmountBarChange}>
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"10"}>10</MenuItem>
                        <MenuItem value={"15"}>15</MenuItem>
                      </Select>
                    </FormCont>
                    </div>
                  </CardContent>
              </Card>
            </DivCards>
            <DivCards>
              <Card >
                <CardMedia style={{backgroundColor:"#fbfbfb"}} image={""}>
                  <SentimentDoughnutChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                <CardContent style={{fontSize:"medium"}}>
                  Project Documents Labels
                  <div style={{display:"-webkit-box"}}>
                    <FormCont>
                      <InputLabel style={{fontSize:"small"}}>Amount: </InputLabel>
                      <Select style={{width:"40%", fontSize:"small"}}
                              value={this.state.amountDoughnut}
                              onChange={this.handleAmountDoughnutChange}>
                        <MenuItem value={"5"}>5</MenuItem>
                        <MenuItem value={"10"}>10</MenuItem>
                        <MenuItem value={"10"}>15</MenuItem>
                      </Select>
                    </FormCont>
                  </div>
                </CardContent>
              </Card>
            </DivCards>
        <DivCards>
          <Card >
            <CardMedia style={{backgroundColor:"#fbfbfb"}} image={""}>
              <SentimentRadarChart projectUUID={this.props.projectUUID}/>
            </CardMedia>
            <CardContent>
              Document Sentiment Values
            </CardContent>
          </Card>
        </DivCards>
            <DivCards>
              <Card >
                <CardMedia style={{backgroundColor:"#fbfbfb"}} image={""}>
                  <SimilarityBubbleChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                <CardContent>
                  Document Similarity
                </CardContent>
              </Card>
            </DivCards>
      </OverviewWrapper>
    );
  }
}

export default VisualizationCharts
