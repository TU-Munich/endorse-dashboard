import React, {Component} from "react";
import SentimentDoughnutChart from './SentimentDoughnutChart';
import SentimentRadarChart from "./SentimentRadarChart";
import SentimetLineChart from "./SentimetLineChart";
import styled from 'styled-components';
import Card from "@material-ui/core/Card/Card";
import {Grid} from "react-md";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import SentimentAreaChart from "./SentimentAreaChart";
import CardContent from "@material-ui/core/es/CardContent/CardContent";

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

class VisualizationCharts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <OverviewWrapper>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <PageTitle>
              Document Visualization
            </PageTitle>
            <div>

            </div>
            <DivCards>

              <Card>
                <CardMedia style={{backgroundColor:"#fbfbfb"}}>
                  <SentimentRadarChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                  <CardContent style={{fontSize:"small"}}>
                    Document Name Entity Recognition
                  </CardContent>
              </Card>
            </DivCards>
            <DivCards>
              <Card >
                <CardMedia style={{backgroundColor:"#fbfbfb"}}>
                  <SentimentDoughnutChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                <CardContent>
                  Document Sentiment Values
                </CardContent>
              </Card>
            </DivCards>
            <DivCards>
              <Card>
                <CardMedia style={{backgroundColor:"#fbfbfb"}}>
                  <SentimetLineChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                <CardContent>
                  Document Sentiment Values
                </CardContent>
              </Card>
            </DivCards>
            <DivCards>
              <Card >
                <CardMedia style={{backgroundColor:"#fbfbfb"}}>
                  <SentimentAreaChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                <CardContent>
                  Document Sentiment Values
                </CardContent>
              </Card>
            </DivCards>
          </Grid>
        </Grid>
      </OverviewWrapper>
    );
  }
}

export default VisualizationCharts
