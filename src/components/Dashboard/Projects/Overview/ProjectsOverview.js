import React, {Component} from 'react';
import styled from 'styled-components';
import ProjectCard from "./ProjectCard";
import Grid from '@material-ui/core/Grid';

const OverviewWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  margin: 1px;
`;

class ProjectsOverview extends Component {
  render() {
    return (
      <OverviewWrapper>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <ProjectCard/>
          </Grid>
          <Grid item xs={4}>
            <ProjectCard/>
          </Grid>
          <Grid item xs={4}>
            <ProjectCard/>
          </Grid>
          <Grid item xs={4}>
            <ProjectCard/>
          </Grid>
        </Grid>
      </OverviewWrapper>
    );
  }
}

export default ProjectsOverview;