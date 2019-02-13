import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class LabelsDoughnutChart extends Component {
    constructor(props) {
        super(props);
    }

    prepareChartData(documentAnalysis) {
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

    render() {
        return (
            <Doughnut data={this.prepareChartData(this.props.data)}/>
        );
    }
}

export default LabelsDoughnutChart;