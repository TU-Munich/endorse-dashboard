import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import NerBarChart from "../VisualizationCharts/NerBarChart";
import LabelsDoughnutChart from "../VisualizationCharts/LabelsDoughnutChart";
import SentimentRadarChart from "../VisualizationCharts/SentimentRadarChart";
import SimilarityBubbleChart from "../VisualizationCharts/SimilarityBubbleChart";
import DocumentService from '../../../services/DocumentService';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import TagsPolarChart from "../VisualizationCharts/TagsPolarChart";

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
const OverviewWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  margin: 1px;
`;
const ChartsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;	
  margin: 10px; 
  max-width: 100%;
`;
const ChartDiv = styled.div`
  width: 50%;
  height: 50%;
  display:inline-block;
  padding-right : 15px;
  margin-bottom: 3%;
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
      totalDocuments: '',
      tagsData:'',
      totalDocumentsProject:'',
      totalCrawled:''
    };
  }
  componentWillMount() {
    if (this.props.document_id !== undefined) {
      this.setState({document_id: this.props.document_id}, () => {
        this.initializeCharts()
      });
    } else {
      this.initializeCharts()
    }

    this.setState({
      loading: true
    }, () => {
      this.fetchTotalDocumentCount().then((status) => {
        if (status === 'success') {
          this.fetchCrawledDocumentsCount().then((status) => {
            if (status === 'success') {
              this.fetchTotalProjectDocuments().then((status) => {
                if (status === 'success') {
                  this.setState({loading: false})
                }
              })
            }
          })
        }
      })
    });
  }

  initializeCharts() {
    this.fetchNerResponseData();
    this.fetchLabelsResponseData();
    this.fetchSentimentResponseData();
    this.fetchTotalDocumentCount();
    this.fetchTagResponseData();
    this.fetchCrawledDocumentsCount();
    this.fetchTotalProjectDocuments();
  }

  fetchNerResponseData(){
    return new Promise((resolve) => {
      DocumentService.getNerCount(this.props.projectUUID,
                                  this.state.amountBar,
                                  undefined,
                                  undefined,
                                  this.state.document_id).then((response) => {
        this.setState({
          nerData: response,
          maxTicks: Math.max(...response.counts) + 2
        }, () => {
          console.log(this.state.maxTicks);
          resolve('success')
        });
      });
    });
  }

  fetchLabelsResponseData(){
    return new Promise((resolve) => {
      DocumentService.getLabelsCount(this.props.projectUUID,
                                     this.state.amountDoughnut,
                                    undefined,
                                    undefined,
                                     this.state.document_id).then((response) => {
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
      DocumentService.getSentimentCount(this.props.projectUUID,
                                        undefined,
                                        undefined,
                                        this.state.document_id).then((response) => {
        this.setState({
          sentimentData: response
        }, () => {
          resolve('success')
        });
      });
    });
  }

  fetchTagResponseData(){
    return new Promise((resolve) => {
      DocumentService.getTagsCount(this.props.projectUUID,
                                  undefined,
                                  undefined,).then((response) => {
        this.setState({
          tagsData: response
        },() => {
          resolve('success')
        });
      });
    });
  }

  fetchTotalDocumentCount(){
    return new Promise((resolve) => {
      DocumentService.getUploadDocumentsCount(this.props.projectUUID).then((response) => {
        this.setState({
          totalDocuments: response
        }, () => {
          resolve('success')
        });
      });
    });
  }

  fetchCrawledDocumentsCount(){
    return new Promise((resolve) => {
      DocumentService.getCrawledDocumentsCount(this.props.projectUUID).then((response) => {
        this.setState({
          totalCrawled: response
        }, () => {
          resolve('success')
        });
      });
    });
  }

  fetchTotalProjectDocuments(){
    return new Promise((resolve) => {
      this.setState({
        totalDocumentsProject: (this.state.totalCrawled + this.state.totalDocuments)
      },() => {
        resolve('success')
      });
    });
  }



  render() {

    return (
      <div>
        {this.state.document_id === undefined &&
          <CardsContainer>
            <CardDiv>
              <CellDiv>
                <Card>
                  <StyledCardContent>
                    <label>Uploaded files</label>
                    <Icon icon="upload" style={{float:"right"}}/>
                  </StyledCardContent>
                  <CardContent style={{textAlign: "center"}}>
                    <InputText  value={this.state.totalDocuments}/>
                    <label style={{display: "block", fontSize: "10px"}}>files were uploaded </label>
                  </CardContent>
                </Card>
              </CellDiv>
              <CellDiv>
                <Card>
                  <StyledCardContent>
                    <label>Crawled files</label>
                    <Icon icon="upload" style={{float:"right"}}/>
                  </StyledCardContent>
                  <CardContent style={{textAlign: "center"}}>
                    <InputText  value={this.state.totalCrawled}/>
                    <label style={{display: "block", fontSize: "10px"}}>links were crawled </label>
                  </CardContent>
                </Card>
              </CellDiv>
              <CellDiv>
                <Card>
                  <StyledCardContent>
                    <label>Total of Documents</label>
                    <Icon icon="upload" style={{float:"right"}}/>
                  </StyledCardContent>
                  <CardContent style={{textAlign: "center"}}>
                    <InputText  value={this.state.totalDocumentsProject}/>
                    <label style={{display: "block", fontSize: "10px"}}>files were analyzed</label>
                  </CardContent>
                </Card>
              </CellDiv>
            </CardDiv>
          </CardsContainer>
        }
        {this.state.document_id === undefined &&
          <Title style={{marginBottom:"5%"}}>Project Overview</Title>
        }
        {this.state.document_id !== undefined &&
          <Title style={{marginBottom: 35, color: 'white'}}>Document Overview</Title>
        }
        <OverviewWrapper>
          <ChartsContainer>
              <ChartDiv>
                <Card>
                  <NerBarChart data={this.state.nerData} maxTicks={this.state.maxTicks}/>
                </Card>
              </ChartDiv>
              <ChartDiv>
                <Card>
                  <LabelsDoughnutChart data={this.state.labelData}/>
                </Card>
              </ChartDiv>
              <ChartDiv>
                <Card>
                  <SentimentRadarChart data={this.state.sentimentData}/>
                </Card>
              </ChartDiv>
            {this.state.document_id === undefined &&
            <ChartDiv>
              <Card>
                <TagsPolarChart data={this.state.tagsData}/>
              </Card>
            </ChartDiv>
            }
            {this.state.document_id !== undefined &&
              <ChartDiv>
                <Card>
                  <SimilarityBubbleChart />
                </Card>
              </ChartDiv>
            }
          </ChartsContainer>
        </OverviewWrapper>
      </div>
    );
  }
}

export default DashboardInfo;