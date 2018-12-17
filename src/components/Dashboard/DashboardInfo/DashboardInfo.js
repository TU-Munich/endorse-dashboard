import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import {Grid} from 'react-md';
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";

const Article = styled.article`
    margin: auto;
    padding: 15px;
`;

const Title = styled.h3`
	font-style: bold;
  font-size: 25px;
	color: #424242;
	text-align: center;
	margin-top:20px;
	margin-bottom:20px;
  text-indent: 40px;
`;

const SubTitle = styled.h4`
  font-style: bold;
  font-size: 18px;
	color: #424242;
	margin-top:20px;
  text-indent: 25px;
`;

const Paragraph = styled.p`
  text-align: justify;		
  text-justify: inter-word;
  font-style: normal;
  font-size: 14px;
  color: #424242;
`;
const CardDiv = styled.div`
  text-align: justify;
  display: -webkit-box;  
  border-radius: 30%;
  padding: 10px 10px;
`;

const CellDiv = styled.div`
  margin-right:10%;
`;

const StyledCardContent = styled.div`
  border-bottom: 2px solid #f2f2f2;
  padding:5px;
  text-align:left;
  color: #336699;
  margin-left:10px;
  margin-right: 10px;
`;

class DashboardInfo extends Component {
  render() {

    return (
      <div>
        <Grid style={{width: "33.33%", gridColumnGap: "33%", margin: "20px 0px"}}>
          <CardDiv>
            <CellDiv>
              <Card>
                <StyledCardContent>
                  <label>Local Search</label>
                  <img style={{width: "10%", height: "10%", marginLeft: "50%",}}
                       src={"https://es.seaicons.com/wp-content/uploads/2015/11/upload-icon1.png"}
                       alt={""}/>
                </StyledCardContent>
                <CardMedia style={{textAlign: "center", margin: "15px"}} src={"picture"}>
                  <label style={{display: "inline-block", fontSize: "30px"}}>5,00</label>
                  <label style={{display: "block", fontSize: "10px"}}>files were analyzed </label>
                </CardMedia>
              </Card>
            </CellDiv>
            <CellDiv>
              <Card>
                <StyledCardContent>
                  <label>External Search</label>
                  <img style={{width: "11%", height: "20%", marginLeft: "44%", marginTop: "7px"}}
                       src={"https://www.freeiconspng.com/uploads/upload-icon-3.png"}
                       alt={""}/>
                </StyledCardContent>
                <CardMedia style={{textAlign: "center", margin: "15px"}} src={"picture"}>
                  <label style={{display: "inline-block", fontSize: "30px"}}>10,00</label>
                  <label style={{display: "block", fontSize: "10px"}}>links were analyzed </label>
                </CardMedia>
              </Card>
            </CellDiv>
            <CellDiv>
              <Card>
                <StyledCardContent>
                  <label>Local Search</label>
                  <img style={{width: "10%", height: "10%", marginLeft: "50%",}}
                       src={"https://es.seaicons.com/wp-content/uploads/2015/11/upload-icon1.png"}
                       alt={""}/>
                </StyledCardContent>
                <CardMedia style={{textAlign: "center", margin: "15px"}} src={"picture"}>
                  <label style={{display: "inline-block", fontSize: "30px"}}>5,00</label>
                  <label style={{display: "block", fontSize: "10px"}}>files were analyzed </label>
                </CardMedia>
              </Card>
            </CellDiv>
          </CardDiv>
        </Grid>
        <CardDiv>
          <Card style={{width: "93%"}}>
            <Article>
              <Title>Welcome to ENDORSE</Title>
              <SubTitle>General Information:</SubTitle>
              <Paragraph>
                Please read these Dashboard information
                carefully before using dashboard specific functionalities. Add description of our web application , main
                objective, etc.
              </Paragraph>
              <Paragraph>
                Add some relevant information about ENDORSE
              </Paragraph>
              <SubTitle>Services that you can use in our Dashboard:</SubTitle>
              <Paragraph>
                Add more information
              </Paragraph>
              <Paragraph>
                More Info
              </Paragraph>
            </Article>
          </Card>
        </CardDiv>
      </div>
    );
  }
}

export default DashboardInfo;