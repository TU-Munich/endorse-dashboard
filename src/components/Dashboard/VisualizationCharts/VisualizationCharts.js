import React, {Component} from "react";
import SentimentDoughnutChart from './SentimentDoughnutChart';
import SentimentRadarChart from "./SentimentRadarChart";
import styled from 'styled-components';

const ChartTitle = styled.h1`
  text-align: center;
`;

class VisualizationCharts extends Component {
  render() {
    return (
      <div>
        <ChartTitle>Doughnut</ChartTitle>
        <SentimentDoughnutChart/>
        <ChartTitle>Radar</ChartTitle>
        <SentimentRadarChart/>
      </div>
    );
  }
}

export default VisualizationCharts
