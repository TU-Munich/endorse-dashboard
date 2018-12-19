import React, {Component} from 'react';
import styled from 'styled-components';
import ProjectCard from "./ProjectCard";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ProjectService from '../../../services/ProjectService'

const OverviewWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  margin: 1px;
`;

const PageTitle = styled.h1`
  text-align: center;
`;

const CreateProjectLink = props => <Link to="/projects-overview/create-project" {...props} />;

class ProjectsOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: []
    };
  }

  fetchProjects() {
    ProjectService.getAllProjects().then((response) => {
      this.setState({
        data: response.data.hits.hits,
        loading: false
      })
    });
  }

  componentWillMount() {
    this.setState({
      loading: true
    }, () => { this.fetchProjects() });
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return (<h2>Loading...</h2>);
    }

    return (
      <OverviewWrapper>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <PageTitle>
              Projects Overview
            </PageTitle>
          </Grid>
          {this.state.data.map((projectInfo, i) =>
            <Grid key={i} item xs={12} sm={12} md={6} lg={4}>
              <ProjectCard {...projectInfo} />
            </Grid>)
          }
          <Fab color="primary" aria-label="Add" className={classes.fab} component={CreateProjectLink}>
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

const FabStyle = theme => ({
  fab: {
    position: 'fixed',
    bottom: 10,
    right: 10
  }
});

export default withStyles(FabStyle)(ProjectsOverview);