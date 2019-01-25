import React, {Component} from "react";
import SentimentDoughnutChart from './SentimentDoughnutChart';
import SentimentRadarChart from "./SentimentRadarChart";
import SentimetLineChart from "./SentimetLineChart";
import styled from 'styled-components';
import Card from "@material-ui/core/Card/Card";
import {Grid} from "react-md";

const ChartTitle = styled.h1`
  text-align: center;
`;
const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  margin: 50px; 
  text-align: center;
  margin-top:20px;
  max-width: 90%;	
`;

class VisualizationCharts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <ContainerDiv>
          <Card style={{height: "300%", padding: "10px 10px 10px"}}>
            <ChartTitle>Visualizations</ChartTitle>
            <Grid style={{ display:"-webkit-box"}}>
              {/*<ChartTitle>Named Entities</ChartTitle>
                <SentimentDoughnutChart/>
                <ChartTitle>Sentiment</ChartTitle>
                <SentimentRadarChart/>*/}

              <SentimentRadarChart projectUUID={this.props.projectUUID}/>

            </Grid>
          </Card>
        </ContainerDiv>
      </div>
    );
  }
}

export default VisualizationCharts
