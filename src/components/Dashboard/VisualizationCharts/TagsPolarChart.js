import React, {Component} from 'react';
import {Polar} from 'react-chartjs-2';

class TagsPolarChart extends Component {
  constructor(props) {
    super(props);
  }

  prepareChartData(documentAnalysis) {
    const chartLabels = documentAnalysis.tagsLabels;
    const chartData = documentAnalysis.tagsCounts;
    return {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: [ '#907AD6',
          '#4BC0C0',
          '#0099cc',
          '#FFCE56',
          '#FF6384',
          '#E7E9ED',
          '#36A2EB']
      }]
    }
  };

  render() {
    return (
      <Polar data={this.prepareChartData(this.props.data)}/>
    );
  }
}

export default TagsPolarChart;