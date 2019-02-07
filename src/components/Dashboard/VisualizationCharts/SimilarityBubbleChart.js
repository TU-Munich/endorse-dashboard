import React, {Component} from 'react';
import {Bubble} from 'react-chartjs-2';

class SimilarityBubbleChart extends Component{
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
      labels:['January'],
      datasets: [{
          label: 'First Dataset',
          data: chartData,
          backgroundColor: '#FF6384',
          hoverBackgroundColor: '#FF6384',
        }]
    }
  };

  fetchSentimentData() {
    let chartData;
    chartData = [
      {x: 20, y: 30, r: 15},
      {x: 40, y: 10, r: 10},
      {x: 25, y: 15, r: 8}
    ];
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
    return (
      <Bubble data={this.prepareChartData(this.state.data)}/>
    );
  }

}
export default SimilarityBubbleChart;