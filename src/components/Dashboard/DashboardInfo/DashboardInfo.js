import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import {Grid} from 'react-md';
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import SentimentBarChart from "../VisualizationCharts/SentimentBarChart";
import SentimentDoughnutChart from "../VisualizationCharts/SentimentDoughnutChart";
import SentimentRadarChart from "../VisualizationCharts/SentimentRadarChart";
import SimilarityBubbleChart from "../VisualizationCharts/SimilarityBubbleChart";
import DocumentService from '../../../services/DocumentService';
import Input from "@material-ui/core/Input/Input";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";

const Article = styled.article`
    margin: auto;
    padding: 15px;
`;

const Title = styled.h3`
	font-style: bold;
  font-size: 25px;
	color: #424242;
	text-align: center;
	margin-top:20px;
	margin-bottom:20px;
  text-indent: 40px;
`;

const CardDiv = styled.div`
  text-align: justify;
  display: -webkit-box;  
  border-radius: 30%;
  padding: 10px 10px;
`;
const CellDiv = styled.div`
  margin-right:10%;
`;
const StyledCardContent = styled.div`
  border-bottom: 2px solid #f2f2f2;
  padding:5px;
  text-align:left;
  color: #336699;
  margin-left:10px;
  margin-right: 10px;
`;

const DivCards = styled.div`
    width: 50%;
    display: inline-block;
    margin-bottom: 7%;
`;

const InputText = styled.input`
   text-align: center;
   font-size :30px;
   border: none;
`;

class DashboardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountBar: '10',
      amountDoughnut: '10',
      nerData: '',
      labelData : '',
      sentimentData: '',
      totalDocuments: ''
    }
    this.fetchNerResponseData();
    this.fetchLabelsResponseData();
    this.fetchSentimentResponseData();
    this.fetchTotalDocumentCount();
  }

  fetchNerResponseData(){
    return new Promise((resolve) => {
      DocumentService.getNerCount(this.props.projectUUID, this.state.amountBar).then((response) => {
        this.setState({
          nerData: response
        }, () => {
          resolve('success')
        });
      });
    });
  }

  fetchLabelsResponseData(){
    return new Promise((resolve) => {
      DocumentService.getLabelsCount(this.props.projectUUID, this.state.amountDoughnut).then((response) => {
        this.setState({
          labelData: response
        },() => {
          resolve('success')
        });
      });
    });
  }
  fetchSentimentResponseData(){
    return new Promise((resolve) => {
      DocumentService.getSentimentCount(this.props.projectUUID).then((response) => {
        this.setState({
          sentimentData: response
        }, () => {
          resolve('success')
        });
      });
    });
  }

  fetchTotalDocumentCount(){
    return new Promise((resolve) => {
      DocumentService.getDocumentsCount(this.props.projectUUID).then((response) => {
        this.setState({
          totalDocuments: response
        }, () => {
          resolve('success')
        });
      });
    });
  }

  render() {

    return (
      <div>
        <Grid style={{width: "33.33%", gridColumnGap: "33%", margin: "20px 0px"}}>
          <CardDiv>
            <CellDiv>
              <Card>
                <StyledCardContent>
                  <label>Local Search</label>
                  <img style={{width: "10%", height: "10%", marginLeft: "50%",}}
                       src={"https://www.freeiconspng.com/uploads/upload-icon-3.png"}
                       alt={""}/>
                </StyledCardContent>
                <CardMedia style={{textAlign: "center", margin: "15px"}} src={"picture"}>
                  <InputText  value={this.state.totalDocuments}/>
                  <label style={{display: "block", fontSize: "10px"}}>files were analyzed </label>
                </CardMedia>
              </Card>
            </CellDiv>
            <CellDiv>
              <Card>
                <StyledCardContent>
                  <label>External Search</label>
                  <img style={{width: "10%", height: "10%", marginLeft: "44%"}}
                       src={"https://www.freeiconspng.com/uploads/upload-icon-3.png"}
                       alt={""}/>
                </StyledCardContent>
                <CardMedia style={{textAlign: "center", margin: "15px"}} src={"picture"}>
                  <InputText  value={this.state.totalDocuments}/>
                  <label style={{display: "block", fontSize: "10px"}}>links were analyzed </label>
                </CardMedia>
              </Card>
            </CellDiv>
            <CellDiv>
              <Card>
                <StyledCardContent>
                  <label>Local Search</label>
                  <img style={{width: "10%", height: "10%", marginLeft: "50%",}}
                       src={"https://www.freeiconspng.com/uploads/upload-icon-3.png"}
                       alt={""}/>
                </StyledCardContent>
                <CardMedia style={{textAlign: "center", margin: "15px"}} src={"picture"}>
                  <InputText  value={this.state.totalDocuments}/>
                  <label style={{display: "block", fontSize: "10px"}}>NER were detected</label>
                </CardMedia>
              </Card>
            </CellDiv>
          </CardDiv>
        </Grid>
        <CardDiv>
          <Card style={{width: "100%"}}>
            <Article>
              <Title style={{marginBottom:"10%"}}>Project Overview</Title>
              <DivCards>
              <SentimentBarChart projectUUID={this.props.projectUUID} data={this.state.nerData}/>
              </DivCards>
              <DivCards>
                <SentimentDoughnutChart projectUUID={this.props.projectUUID} data={this.state.labelData}/>
              </DivCards>
              <DivCards>
                <SentimentRadarChart projectUUID={this.props.projectUUID} data={this.state.sentimentData}/>
              </DivCards>
              <DivCards>
                <SimilarityBubbleChart projectUUID={this.props.projectUUID}/>
              </DivCards>
            </Article>
          </Card>
        </CardDiv>
      </div>
    );
  }
}

export default DashboardInfo;