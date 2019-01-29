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
                backgroundColor: ["#474653", '#4241A3', '#155787', '#70AFA9',
                  '#FAF7DC', '#3066BE', '#119DA4', '#91C3E0', '#907AD6', '#4273C3'],
                hoverBackgroundColor: ['#99989F', '#6463B3', '#3F759C', '#8ABDB8',
                  '#FAF8E2', '#5581C9', '#3CAEB4', '#A5CDE5','#B8AAE4','#7B9DD5']
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