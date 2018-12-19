import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
// import AnalyticsService from '../../../services/AnalyticsService

class SentimentChart extends Component {
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

  prepareChartData(sentimentData) {
    // let chartData = [sentimentData.compound, sentimentData.neg, sentimentData.neu, sentimentData.pos];
    let chartData = sentimentData;
    return {
      labels: ['Compound', 'Negative', 'Neutral', 'Positive'],
      datasets: [{
        data: chartData,
        backgroundColor: ["#0091ac", '#e4e4e4', '#0d386e', '#8187b1'],
        hoverBackgroundColor: ['#0091ac', '#e4e4e4', '#0d386e', '#8187b1']
      }]
    }
  };

  fetchSentimentData() {
    let chartData;
    chartData = ['-7.406099999999999', '0.019231671554252202', '0.8160439882697946', '0.026894428152492666'];
    /*AnalyticsService.getSentimentData().then((response) => {
      chartData = prepareChartData(response.data.hits.hits[0].total);
      this.setState({
        data: chartData,
        loading: false
      })
    })*/
    this.setState({
      data: chartData,
      loading: false
    })
  };

  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>
    }
    console.log(this.state);
    return (
      <Doughnut data={this.prepareChartData(this.state.data)}/>
    );
  }
}

export default SentimentChart;