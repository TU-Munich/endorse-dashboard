import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';


const options = {
  responsive: true,
  scales: {
    yAxes: [{
      lineWidth: 1,
      tickWidth: 1,
      title: {
        display: true,
        align: 'high',
        offset: 0,
        text: "Amount of hits",
        rotation: 270
      },
      display: true,
      ticks: {
        min: 0
      }
    }],
    xAxes: [{
      label: {
        show: false
      },
      ticks: {
        fontFamily: "Calibri",
        fontSize: 10,
        autoSkip: false,
        maxRotation: 90,
        minRotation: 0
      }
    }]
  }
};
class SentimentBarChart extends Component{
  constructor(props) {
    super(props);
    if (this.props.document_id !== undefined) {
      this.setState({document_id: this.props.document_id});
    }
  }

  prepareChartData(documentAnalysis) {
    const chartKeyword = documentAnalysis.keyword;
    const chartCount = documentAnalysis.counts;
    return {

      labels: chartKeyword,
      datasets: [{
        label:"Most relevant words",
        data: chartCount,
        fill: false,
        lineTension: 0.1,
        beginAtZero: true,
        backgroundColor: ['rgba(75,192,192,0.4)', '#119DA4', '#91C3E0', '#907AD6', '#4273C3',
          '#FAF7DC', '#3066BE','#4241A3', '#155787', '#70AFA9'],
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 2,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 2,
        pointHoverBorderWidth: 2,
        pointRadius: 1
      }]
    }
  };

  render() {
    return (
      <Bar data={this.prepareChartData(this.props.data)} options={options}/>
    );
  }
}
export default SentimentBarChart;