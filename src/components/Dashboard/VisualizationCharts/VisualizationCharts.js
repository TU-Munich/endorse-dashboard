import React, {Component} from "react";
import SentimentDoughnutChart from './SentimentDoughnutChart';
import SentimentBarChart from "./SentimentBarChart";
import styled from 'styled-components';
import Card from "@material-ui/core/Card/Card";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SentimentRadarChart from "./SentimentRadarChart";
import SimilarityBubbleChart from "./SimilarityBubbleChart";
import DocumentService from "../../../services/DocumentService";


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
      amountBar: '10',
      amountDoughnut: '10',
      nerData: '',
      labelData : '',
      sentimentData: ''
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSelectChange= this.handleSelectChange.bind(this);
    this.handleAmountBarChange= this.handleAmountBarChange.bind(this);
    this.handleAmountDoughnutChange= this.handleAmountDoughnutChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: true
    }, () => {
      this.fetchNerResponseData().then((status) => {
        if (status === 'success') {
          this.fetchLabelsResponseData().then((status) =>{
            if (status === 'success') {
              this.fetchSentimentResponseData().then((status) => {
                if (status === 'success') {
                  this.setState({loading: false})
                }
              })
            }
          })
        }
      });
    })
  }

  handleStartDateChange(date) {
    this.setState({startDate: date}, () =>{
      this.fetchNerResponseData();
      this.fetchLabelsResponseData();
      this.fetchSentimentResponseData();
    });
  }

  handleEndDateChange(date) {
    this.setState({endDate: date}, () => {
      this.fetchNerResponseData();
      this.fetchLabelsResponseData();
      this.fetchSentimentResponseData();
    });
  }

  handleSelectChange(event) {
    this.setState({value: event.target.value});
  }

  handleAmountBarChange(event) {
    this.setState({amountBar: event.target.value}, () => {
      this.fetchNerResponseData()
    });
  }

  handleAmountDoughnutChange(event) {
    this.setState({amountDoughnut: event.target.value}, () =>{
      this.fetchLabelsResponseData()
    });
  }

  fetchNerResponseData(){
    return new Promise((resolve) => {
      let unixDateFrom = Date.parse(this.state.startDate)/1000;
      let unixDateTo = Date.parse(this.state.endDate)/1000;
      DocumentService.getNerCount(this.props.projectUUID, this.state.amountBar, unixDateFrom, unixDateTo).then((response) => {
        this.setState({
          nerData: response
        }, () => {
          resolve('success')
        });
      });
    });
  }

  fetchLabelsResponseData(){
    let unixDateFrom = Date.parse(this.state.startDate)/1000;
    let unixDateTo = Date.parse(this.state.endDate)/1000;
    return new Promise((resolve) => {
      DocumentService.getLabelsCount(this.props.projectUUID, this.state.amountDoughnut, unixDateFrom, unixDateTo).then((response) => {
        this.setState({
          labelData: response
        },() => {
          resolve('success')
        });
      });
    });
  }

  fetchSentimentResponseData(){
    let unixDateFrom = Date.parse(this.state.startDate)/1000;
    let unixDateTo = Date.parse(this.state.endDate)/1000;
    return new Promise((resolve) => {
      DocumentService.getSentimentCount(this.props.projectUUID, unixDateFrom, unixDateTo).then((response) => {
        this.setState({
          sentimentData: response
        }, () => {
          resolve('success')
        });
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>
    }
    return (
      <OverviewWrapper>
            <PageTitle>
              Project Visualization
            </PageTitle>
            <div style={{width:"60%", backgroundColor:"#fbfbfb", left:"25%", position:"relative"}}>
              <div style={{display:"inline-flex", paddingLeft:"15px"}}>
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
                  <SentimentBarChart projectUUID={this.props.projectUUID}  data={this.state.nerData}/>
                </CardMedia>
                  <CardContent style={{fontSize:"medium"}}>
                    Document Name Entity Recognition:
                    <div style={{display:"-webkit-box"}}>
                    <FormCont>
                      <InputLabel style={{fontSize:"small"}}>Amount: </InputLabel>
                      <Select style={{width:"40%", fontSize:"small"}}
                              value={this.state.amountBar}
                              onChange={this.handleAmountBarChange}>
                        <MenuItem value={"3"}>3</MenuItem>
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
                  <SentimentDoughnutChart projectUUID={this.props.projectUUID} data={this.state.labelData}/>
                </CardMedia>
                <CardContent style={{fontSize:"medium"}}>
                  Project Documents Labels
                  <div style={{display:"-webkit-box"}}>
                    <FormCont>
                      <InputLabel style={{fontSize:"small"}}>Amount: </InputLabel>
                      <Select style={{width:"40%", fontSize:"small"}}
                              value={this.state.amountDoughnut}
                              onChange={this.handleAmountDoughnutChange}>
                        <MenuItem value={"3"}>3</MenuItem>
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
              <SentimentRadarChart projectUUID={this.props.projectUUID} data={this.state.sentimentData}/>
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
