import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';
import DocumentService from '../../../services/DocumentService';

class SentimentRadarChart extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: []
    }
  }
  componentWillMount() {
    this.setState({
      loading: true
    }, () => {this.fetchSentimentData()})
  }

  prepareChartData(documentAnalysis) {
    console.log(documentAnalysis);
    let chartData = documentAnalysis.total;
    console.log(chartData);
    return {
      labels: ['Positive', 'Negative', 'Neutral'],
      datasets: [{
        scaleOverride: true,
        scaleSteps: 4,
        scaleStepWidth: 5,
        label: "Sentiment Data",
        data: chartData,
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
      }]
    }
  };

  fetchSentimentData() {
    DocumentService.getSentimentCount(this.props.projectUUID).then((response) => {
      this.setState({
        data: response,
        loading: false
      });
    });
  };

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>
    }
    console.log(this.state);
    return (
      <Radar data={this.prepareChartData(this.state.data)}/>
    );
  }

}
export default SentimentRadarChart;