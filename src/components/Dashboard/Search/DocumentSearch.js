import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components'
import DocumentService from '../../../services/DocumentService'
import Grid from "@material-ui/core/Grid/Grid";
import ProjectCard from "../../Projects/Overview/ProjectCard";

const styles = {
  root: {
    margin: '10px auto',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '98%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

const Tags = styled.div`
  margin: auto;
  align-items: center;
  width: 98%;
`;

class DocumentSearch extends Component {

  constructor(props) {
    super(props);
    this.state = { search_term: '', search_tags: [], results: [], tags: [], loading: true };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleDocumentSearch = this.handleDocumentSearch.bind(this);
    this.handleTagSelection = this.handleTagSelection.bind(this);
  }

  componentWillMount() {
    DocumentService.getAllTags().then((tags) => {
      this.setState({ tags: tags, loading: false })
    })
  }

  onSearchChange(event) {
    this.setState({search_term: event.target.value});
  }

  handleTagSelection(event) {
    console.log(event);
    let search_tags = [].concat(this.state.search_tags, event.target.value);
    this.setState({search_tags: search_tags});
    console.log(this.state.search_tags);
  }

  handleDocumentSearch() {

  }

  render() {
    if (this.state.loading) { return (<h2>Loading...</h2>) }
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <InputBase
            className={classes.input}
            placeholder="Search documents"
            onChange={ this.onSearchChange }
            />
          <Divider className={classes.divider} />
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            onClick={ this.handleDocumentSearch }>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Tags>
          {
            this.state.tags.map((tag, i) =>
              <Chip
                key={i}
                label={tag.name}
                clickable
                className={classes.chip}
                color="primary"
                variant="outlined"
                onClick={ this.handleTagSelection }
                selected={true}
                style={{marginRight: '2px', marginBottom: '2px'}}
              />
            )
          }
        </Tags>
      </div>
    )
  }
}

DocumentSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(DocumentSearch)