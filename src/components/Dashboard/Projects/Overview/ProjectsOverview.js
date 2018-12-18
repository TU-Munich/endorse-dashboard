import React, {Component} from 'react';
import styled from 'styled-components';
import ProjectCard from "./ProjectCard";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const OverviewWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  margin: 1px;
`;

const PageTitle = styled.h1`
  text-align: center;
`;

const MyLink = props => <Link to="/dashboard/create-project" {...props} />;

const FabStyle = theme => ({
  fab: {
    position: 'fixed',
    bottom: 10,
    right: 10
  }
});

class ProjectsOverview extends Component {
  render() {
    const { classes } = this.props;

    return (
      <OverviewWrapper>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <PageTitle>
              Projects Overview
            </PageTitle>
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
          <Grid item xs={4}>
            <ProjectCard/>
          </Grid>
          <Fab color="primary" aria-label="Add" className={classes.fab} component={MyLink}>
            <AddIcon className={'Inner'} />
          </Fab>
        </Grid>
      </OverviewWrapper>
    );
  }
}

ProjectsOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(FabStyle)(ProjectsOverview);