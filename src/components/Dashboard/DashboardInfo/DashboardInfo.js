import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import {Grid} from 'react-md';
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import SentimentRadarChart from "../VisualizationCharts/SentimentRadarChart";
import SentimentDoughnutChart from "../VisualizationCharts/SentimentDoughnutChart";
import SentimetLineChart from "../VisualizationCharts/SentimetLineChart";
import SentimentAreaChart from "../VisualizationCharts/SentimentAreaChart";

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

const SubTitle = styled.h4`
  font-style: bold;
  font-size: 18px;
	color: #424242;
	margin-top:20px;
  text-indent: 25px;
`;

const Paragraph = styled.p`
  text-align: justify;		
  text-justify: inter-word;
  font-style: normal;
  font-size: 14px;
  color: #424242;
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

class DashboardInfo extends Component {
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
                  <label style={{display: "inline-block", fontSize: "30px"}}>10</label>
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
                  <label style={{display: "inline-block", fontSize: "30px"}}>100</label>
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
                  <label style={{display: "inline-block", fontSize: "30px"}}>500</label>
                  <label style={{display: "block", fontSize: "10px"}}>NER were detected</label>
                </CardMedia>
              </Card>
            </CellDiv>
          </CardDiv>
        </Grid>
        <CardDiv>
          <Card style={{width: "93%"}}>
            <Article>
              <Title style={{marginBottom:"10%"}}>Project Overview</Title>
              <div style={{width: "50%", display:"inline-block", marginBottom:"7%"}}>
                <SentimentRadarChart projectUUID={this.props.projectUUID}/>
              </div>
              <div style={{width: "50%",  display:"inline-block", marginBottom:"7%"}}>
                <SentimentDoughnutChart projectUUID={this.props.projectUUID}/>
              </div>
              <div style={{width: "50%",  display:"inline-block"}}>
                <SentimetLineChart projectUUID={this.props.projectUUID}/>
              </div>
              <div style={{width: "50%",  display:"inline-block"}}>
                <SentimentAreaChart projectUUID={this.props.projectUUID}/>
              </div>
            </Article>
          </Card>
        </CardDiv>
      </div>
    );
  }
}

export default DashboardInfo;