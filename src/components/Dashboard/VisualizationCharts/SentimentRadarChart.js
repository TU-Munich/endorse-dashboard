import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';

class SentimentRadarChart extends Component{
  constructor(props) {
    super(props);
  }

  prepareChartData(documentAnalysis) {
    let chartData = documentAnalysis.total;
    return {
      labels: ['Positive', 'Negative', 'Neutral'],
      datasets: [{
        scaleOverride: true,
        scaleSteps: 4,
        scaleStepWidth: 5,
        label: "Sentiment Data",
        data: chartData,
        backgroundColor: ['rgba(179,181,198,0.2)', "rgba(75,192,192,0.4)"],
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
      }]
    }
  };


  render() {
    return (
      <Radar data={this.prepareChartData(this.props.data)}/>
    );
  }

}
export default SentimentRadarChart;