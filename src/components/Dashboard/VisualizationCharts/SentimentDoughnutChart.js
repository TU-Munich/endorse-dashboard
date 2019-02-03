import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import DocumentService from "../../../services/DocumentService";


class SentimentDoughnutChart extends Component {
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
      const chartLabels = documentAnalysis.labels;
      const chartData = documentAnalysis.labelCounts;
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
    DocumentService.getLabelsCount(this.props.projectUUID).then((response) => {
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
            <Doughnut data={this.prepareChartData(this.state.data)}/>
        );
    }
}

export default SentimentDoughnutChart;