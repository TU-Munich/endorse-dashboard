import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import NlpServices from "../../../services/NlpService";

// import AnalyticsService from '../../../services/AnalyticsService

class SentimentDoughnutChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }]
                }
            }
        }
    }

    componentWillMount() {
        this.setState({
            loading: true
        }, () => {
            this.fetchSentimentData()
        })
    }

    prepareChartData(documentAnalysis) {
        // let chartData = [sentimentData.compound, sentimentData.neg, sentimentData.neu, sentimentData.pos];
      const chartLabels = documentAnalysis[0];
      const chartData = documentAnalysis[1];
        return {
            labels: chartLabels,
            datasets: [{
                data: chartData,
                backgroundColor: ["#0091ac", '#e4e4e4', '#0d386e', '#8187b1'],
                hoverBackgroundColor: ['#0091ac', '#e4e4e4', '#0d386e', '#8187b1']
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
        console.log(this.state);
        return (
            <Doughnut data={this.prepareChartData(this.state.data)}/>
        );
    }
}

export default SentimentDoughnutChart;