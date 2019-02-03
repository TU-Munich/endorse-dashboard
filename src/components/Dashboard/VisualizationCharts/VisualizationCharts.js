import React, {Component} from "react";
import SentimentDoughnutChart from './SentimentDoughnutChart';
import SentimentRadarChart from "./SentimentRadarChart";
import SentimetLineChart from "./SentimetLineChart";
import styled from 'styled-components';
import Card from "@material-ui/core/Card/Card";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import SentimentAreaChart from "./SentimentAreaChart";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { Slider } from 'material-ui-slider';

const OverviewWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  margin: 1px;
`;

const PageTitle = styled.h1`
  text-align: center;
`;
const DivCards = styled.div`
  width: 50%;
  height: 50%;
  display:inline-block;
  padding-right : 15px;
  margin-bottom: 3%;
`;

const FormCont = styled.form`
    margin: theme.spacing.unit;
    padding: 5px;
    fontsize: 10px;
`;


class VisualizationCharts extends Component {
  state = {
    sliderValue: 10,
  };

  constructor(props) {
    super(props);
  }


  render() {
    const { sliderValue } = this.state;
    return (
      <OverviewWrapper>
            <PageTitle>
              Project Visualization
            </PageTitle>
            <div style={{width:"55%", backgroundColor:"#fbfbfb", left:"25%", position:"relative"}}>
              <div style={{display:"-webkit-box", paddingLeft:"15px"}}>
                <FormCont>
                  <InputLabel htmlFor="filter_id">Source data: </InputLabel>
                  <Select style={{width:"80px"}}>
                    <MenuItem value={"uploaded"}>Uploaded</MenuItem>
                    <MenuItem value={"crawled"}>Crawled</MenuItem>
                  </Select>
                </FormCont>
              <FormCont>
                <InputLabel htmlFor="filter_id">Filter by:</InputLabel>
                <Select style={{width:"80px"}}>
                  <MenuItem value={"ner"}>Name Entity Recognition</MenuItem>
                  <MenuItem value={"sentences"}>Sentences</MenuItem>
                  <MenuItem value={"label"}>Labels</MenuItem>
                  <MenuItem value={"sentiment"}>Sentiment</MenuItem>
                </Select>
              </FormCont>
                <FormCont style={{marginTop:"1%"}}>
                  <InputLabel htmlFor="count_id">Amount:</InputLabel>
                  <Slider
                    value={sliderValue}
                    min={1}
                    max={10}
                    style={{width:"80px", position: "absolute"}}
                    onChange={this.handleChange}
                  />
                </FormCont>
              </div>
            </div><br/>

            <DivCards>
              <Card>
                <CardMedia style={{backgroundColor:"#fbfbfb"}}>
                  <SentimentRadarChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                  <CardContent style={{fontSize:"small"}}>
                    Document Name Entity Recognition
                  </CardContent>
              </Card>
            </DivCards>
            <DivCards>
              <Card >
                <CardMedia style={{backgroundColor:"#fbfbfb"}}>
                  <SentimentDoughnutChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                <CardContent>
                  Document Sentiment Values
                </CardContent>
              </Card>
            </DivCards>
            <DivCards>
              <Card>
                <CardMedia style={{backgroundColor:"#fbfbfb"}}>
                  <SentimetLineChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                <CardContent>
                  Document Sentiment Values
                </CardContent>
              </Card>
            </DivCards>
            <DivCards>
              <Card >
                <CardMedia style={{backgroundColor:"#fbfbfb"}}>
                  <SentimentAreaChart projectUUID={this.props.projectUUID}/>
                </CardMedia>
                <CardContent>
                  Document Sentiment Values
                </CardContent>
              </Card>
            </DivCards>
      </OverviewWrapper>
    );
  }
}

export default VisualizationCharts
