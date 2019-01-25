import React, {Component} from 'react';
import styled from 'styled-components';
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardSideBar from "../../components/Dashboard/DashboardSideBar";
import DashboardContent from "../../components/Dashboard/DashboardContent";

const ContainerHeaderDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 10px 3px 5px gray;
`;
const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  overflow-y: auto;
  overflow-x: hidden;
`;

const ContentsDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;		
  overflow-y: auto;
  overflow-x: hidden;
`;

const Content = styled.div`
  margin-left: 200px;
  width: 100%;
  overflow-x: hidden;
`;

class DashboardTemplate extends Component {
  render() {
    return (
      <ContainerDiv>
        <ContainerHeaderDiv>
          <DashboardHeader/>
        </ContainerHeaderDiv>
        <ContentsDiv>
          <DashboardSideBar params={this.props.match}/>
          <Content>
            <DashboardContent params={this.props.match} />
          </Content>
        </ContentsDiv>
      </ContainerDiv>
    );
  }
}

export default DashboardTemplate;
