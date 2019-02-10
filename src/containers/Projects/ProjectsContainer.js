import React, {Component} from 'react';
import styled from 'styled-components';
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import ProjectsOverview from "../../components/Projects/Overview/ProjectsOverview";
import CreateProject from "../../components/Projects/CreateProjectForm/Project";
import {Redirect, Route, Switch} from "react-router-dom";


const ContainerHeaderDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0px 2px 5px grey;
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
            <Switch>
              <Redirect exact from={"/projects-overview"} to={"/projects-overview/all"} />
              <Route path={"/projects-overview/all"} component={ProjectsOverview}/>
              <Route path={"/projects-overview/create-project"} component={CreateProject}/>
            </Switch>
          </Content>
        </ContentsDiv>
      </ContainerDiv>
    );
  }
}

export default ProjectsContainer;
