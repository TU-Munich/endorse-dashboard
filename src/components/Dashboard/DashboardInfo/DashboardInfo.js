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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
  display: inline-flex; 
  width: 100%;
`;
const CellDiv = styled.div`
  width: 33.1%;
  padding: 0 5px;
`;
const StyledCardContent = styled.div`
  border-bottom: 2px solid #f2f2f2;
  padding:5px;
  text-align:left;
  color: white;
  background-color: #2e353e;
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
const Icon = styled(FontAwesomeIcon)`
  display: inline-block;
  position: relative;
`;
const CardsContainer = styled.div`
  display: flex;
  margin: 1%; 
  max-width: 99%
  width:99%;
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
        <CardsContainer>
          <CardDiv>
            <CellDiv>
              <Card>
                <StyledCardContent>
                  <label>Uploaded data</label>
                  <Icon icon="upload" style={{float:"right"}}/>
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
                  <label>Crawled data</label>
                  <Icon icon="upload" style={{float:"right"}}/>
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
                  <Icon icon="upload" style={{float:"right"}}/>
                </StyledCardContent>
                <CardMedia style={{textAlign: "center", margin: "15px"}} src={"picture"}>
                  <InputText  value={this.state.totalDocuments}/>
                  <label style={{display: "block", fontSize: "10px"}}>NER were detected</label>
                </CardMedia>
              </Card>
            </CellDiv>
          </CardDiv>
        </CardsContainer>
        <CardDiv>
          <Card style={{width: "100%", margin:"1%"}}>
            <Article>
              <Title style={{marginBottom:"5%"}}>Project Overview</Title>
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