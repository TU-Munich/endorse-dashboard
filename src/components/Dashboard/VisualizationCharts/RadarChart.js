import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';

class RadarChart extends Component{
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
    let chartData;
    chartData = ['0.045287035405635834', '0.003675926011055708', '0.8769537210464478'];
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
export default RadarChart;