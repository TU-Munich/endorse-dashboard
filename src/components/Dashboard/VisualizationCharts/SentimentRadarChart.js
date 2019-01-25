import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import NlpServices from '../../../services/NlpService';

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
    const chartLabels = documentAnalysis[0];
    const chartData = documentAnalysis[1];
    console.log(chartLabels);
    console.log(chartData);
    return {
      labels: chartLabels,
      datasets: [{
        label: "Project Data",
        data: chartData,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10
      }]
    }
  };
  fetchSentimentData() {
    NlpServices.getDataResults(this.props.projectUUID).then((response) => {
      let chartData = this.parseDocumentsIn(response);
      this.setState({
        data: chartData,
        loading: false
      })
    });
  }
  parseDocumentsIn(rawAnalysis) {
    let documentAnalysis = rawAnalysis.data;
    return documentAnalysis
  }
  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>
    }
    return (
      <Bar data={this.prepareChartData(this.state.data)}/>
    );
  }
}
export default SentimentRadarChart;