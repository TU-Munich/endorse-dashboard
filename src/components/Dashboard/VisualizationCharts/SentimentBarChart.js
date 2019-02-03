import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import DocumentService from '../../../services/DocumentService';

class SentimentBarChart extends Component{
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
    const chartKeyword = documentAnalysis.keyword;
    const chartCount = documentAnalysis.counts;
    return {
      labels: chartKeyword,
      datasets: [{
        label: "Name Entity Recognition",
        data: chartCount,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 2,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 2,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1
      }]
    }
  };
  fetchSentimentData() {
    DocumentService.getNerCount(this.props.projectUUID).then((response) => {
      this.setState({
        data: response,
        loading: false
      });
    });
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
export default SentimentBarChart;