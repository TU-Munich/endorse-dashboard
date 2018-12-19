import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';

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

  prepareChartData(sentimentData) {
    // let chartData = [sentimentData.compound, sentimentData.neg, sentimentData.neu, sentimentData.pos];
    let chartData = sentimentData;
    return {
      labels: ['Compound', 'Negative', 'Neutral', 'Positive'],
      datasets: [{
        label: "Project Data",
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
      <Radar data={this.prepareChartData(this.state.data)}/>
    );
  }

}
export default SentimentRadarChart;