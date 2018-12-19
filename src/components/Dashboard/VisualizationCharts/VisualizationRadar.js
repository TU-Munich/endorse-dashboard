import React, {Component} from "react";
import SentimentRadarChart from './SentimentRadarChart';

class VisualizationRadar extends Component {
  render() {
    return (
      <div>
        <h1>Radar Example</h1>
        <SentimentRadarChart/>
      </div>
    );
  }
}

export default VisualizationRadar
