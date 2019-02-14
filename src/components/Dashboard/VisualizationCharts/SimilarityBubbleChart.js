import React, {Component} from 'react';
import {Bubble} from 'react-chartjs-2';

class SimilarityBubbleChart extends Component {
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
        }, () => {
            this.fetchSentimentData()
        })
    }


    fetchSentimentData() {
        let chartData = {
            "datasets": [
                {
                    "backgroundColor": "#FF6384",
                    "data": [
                        {
                            "id": "59919de75dac34f4a7acf38a2f4697dd",
                            "r": 30,
                            "similarity": 0,
                            "x": -178.96,
                            "y": 97.61
                        }
                    ],
                    "hoverBackgroundColor": "#FF6384",
                    "label": "Information Security 1.pptx"
                },
                {
                    "backgroundColor": "#FF6384",
                    "data": [
                        {
                            "id": "59919de75dac34f4a7acf38a2f4697dd",
                            "r": 30,
                            "similarity": 0,
                            "x": -73.84,
                            "y": 165.76
                        }
                    ],
                    "hoverBackgroundColor": "#FF6384",
                    "label": "Information Security 9.pptx"
                },
                {
                    "backgroundColor": "#FF6384",
                    "data": [
                        {
                            "id": "4639bc971a00a84d4c3050311e507077",
                            "r": 29.7,
                            "similarity": 0.01,
                            "x": -67.38,
                            "y": 40.64
                        }
                    ],
                    "hoverBackgroundColor": "#FF6384",
                    "label": "Information Security 8.pptx"
                },
                {
                    "backgroundColor": "#FF6384",
                    "data": [
                        {
                            "id": "9a1add9d60de3e26bd51364ad91758e1",
                            "r": 29.4,
                            "similarity": 0.02,
                            "x": -60.92,
                            "y": -84.48
                        }
                    ],
                    "hoverBackgroundColor": "#FF6384",
                    "label": "Information Security 3.pptx"
                },
                {
                    "backgroundColor": "#FF6384",
                    "data": [
                        {
                            "id": "96a8a52c6477cf747e71ca2ee2f68eb2",
                            "r": 29.4,
                            "similarity": 0.02,
                            "x": -172.51,
                            "y": -27.51
                        }
                    ],
                    "hoverBackgroundColor": "#FF6384",
                    "label": "Information Security 4.pptx"
                },
                {
                    "backgroundColor": "#FF6384",
                    "data": [
                        {
                            "id": "42f77313bb751d98f6336029e2a20b77",
                            "r": 27.6,
                            "similarity": 0.08,
                            "x": 37.75,
                            "y": 108.79
                        }
                    ],
                    "hoverBackgroundColor": "#FF6384",
                    "label": "sample_proposal.pdf"
                },
                {
                    "backgroundColor": "#FF6384",
                    "data": [
                        {
                            "id": "42f77313bb751d98f6336029e2a20b77",
                            "r": 27.6,
                            "similarity": 0.08,
                            "x": 44.2,
                            "y": -16.32
                        }
                    ],
                    "hoverBackgroundColor": "#FF6384",
                    "label": "Information Security 7.pptx"
                }
            ],
            "labels": [
                "similarity"
            ]
        };
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
            <Bubble data={this.state.data}/>
        );
    }

}

export default SimilarityBubbleChart;