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
    fontsize: normal;
`;

const CardsContainer = styled.div`
   display: flex;
  flex-flow: row wrap;	
  margin: 10px; 
  max-width: 100%;
`;

class VisualizationCharts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      value: 'uploaded',
      amountBar: '5',
      amountDoughnut: '3',
      nerData: '',
      labelData : '',
      sentimentData: '',
      document_id: window.localStorage.getItem('document_id')
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

  componentWillUnmount() {
    window.localStorage.removeItem('document_id');
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
      DocumentService.getNerCount(this.props.projectUUID, this.state.amountBar, unixDateFrom, unixDateTo, this.state.document_id).then((response) => {
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
      DocumentService.getLabelsCount(this.props.projectUUID, this.state.amountDoughnut, unixDateFrom, unixDateTo, this.state.document_id).then((response) => {
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
      DocumentService.getSentimentCount(this.props.projectUUID, unixDateFrom, unixDateTo, this.state.document_id).then((response) => {
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
            <div style={{width:"98%", margin:"0 auto"}}>
              <div style={{display:"flex", margin:"0 auto", maxWidth:"55%", alignItems:"center"}}>
                <FormCont>
                  <InputLabel htmlFor="filter_id">Source data: </InputLabel>
                  <Select style={{width:"100px", fontSize:"small", padding:"0 5px", maxHeight:"17px"}}
                          value={this.state.value}
                          onChange={this.handleSelectChange}>
                    <MenuItem value={"uploaded"}>Uploaded</MenuItem>
                    <MenuItem value={"crawled"}>Crawled</MenuItem>
                    <MenuItem value={"both"}>Both</MenuItem>
                  </Select>
                </FormCont>
                <FormCont style={{padding:"0 5px"}}>
                <InputLabel>From:</InputLabel>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleStartDateChange}/>
                </FormCont>
                <FormCont style={{padding:"0 5px"}}>
                  <InputLabel>To:</InputLabel>
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}/>
                </FormCont>
              </div>
            </div><br/>

        <CardsContainer>
            <DivCards>
              <Card>
                <CardContent style={{backgroundColor:"#fbfbfb"}}>
                  <SentimentBarChart projectUUID={this.props.projectUUID}  data={this.state.nerData}/>
                </CardContent>
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
                <CardContent style={{backgroundColor:"#fbfbfb"}}>
                  <SentimentDoughnutChart projectUUID={this.props.projectUUID} data={this.state.labelData}/>
                </CardContent>
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
            <CardContent style={{backgroundColor:"#fbfbfb"}}>
              <SentimentRadarChart projectUUID={this.props.projectUUID} data={this.state.sentimentData}/>
            </CardContent>
            <CardContent>
              Document Sentiment Values
            </CardContent>
          </Card>
        </DivCards>
            <DivCards>
              <Card >
                <CardContent style={{backgroundColor:"#fbfbfb"}}>
                  <SimilarityBubbleChart projectUUID={this.props.projectUUID}/>
                </CardContent>
                <CardContent>
                  Document Similarity
                </CardContent>
              </Card>
            </DivCards>
        </CardsContainer>
      </OverviewWrapper>
    );
  }
}

export default VisualizationCharts
