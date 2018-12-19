import React, {Component} from "react";
import SentimentChart from './SentimentChart';

class VisualizationCharts extends Component {
  render() {
    return (
      <div>
        <h1>Doughnut Example</h1>
        <SentimentChart/>
      </div>
    );
  }
}

export default VisualizationCharts
