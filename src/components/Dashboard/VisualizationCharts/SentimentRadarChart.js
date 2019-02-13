import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';

class SentimentRadarChart extends Component{
  constructor(props) {
    super(props);
  }

  prepareChartData(documentAnalysis) {
    let chartData = documentAnalysis.total;
    return {
      labels: ['Compound', 'Negative', 'Neutral','Positive'],
      datasets: [{
        scaleOverride: true,
        scaleSteps: 4,
        label:"Total Sentiment Analysis",
        scaleStepWidth: 5,
        data: chartData,
        backgroundColor: ['rgba(129,181,180,0.2)', "rgba(75,192,192,0.4)"],
        borderColor: '#00b3b3',
        pointBackgroundColor: '#00b3b3'
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