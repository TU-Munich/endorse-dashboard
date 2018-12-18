import React, {Component} from 'react';
import styled from 'styled-components';
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import ProjectsOverview from "../../components/Projects/Overview/ProjectsOverview";


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
  margin-left: 60px;
  width: 100%;
  overflow-x: hidden;
`;

class ProjectsContainer extends Component {
  render() {
    return (
      <ContainerDiv>
        <ContainerHeaderDiv>
          <DashboardHeader/>
        </ContainerHeaderDiv>
        <ContentsDiv>
          <Content>
            <ProjectsOverview/>
          </Content>
        </ContentsDiv>
      </ContainerDiv>
    );
  }
}

export default ProjectsContainer;
