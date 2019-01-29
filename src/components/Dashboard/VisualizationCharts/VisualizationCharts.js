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
            <DivCards>
              <Card>
                <SentimentRadarChart projectUUID={this.props.projectUUID}/>
              </Card>
            </DivCards>
            <DivCards>
              <Card >
                <SentimentDoughnutChart projectUUID={this.props.projectUUID}/>
              </Card>
            </DivCards>
            <DivCards>
              <Card>
                <SentimetLineChart projectUUID={this.props.projectUUID}/>
              </Card>
            </DivCards>
            <DivCards>
              <Card >
                <SentimentAreaChart projectUUID={this.props.projectUUID}/>
              </Card>
            </DivCards>
          </Grid>
        </Grid>
      </OverviewWrapper>
    );
  }
}

export default VisualizationCharts
