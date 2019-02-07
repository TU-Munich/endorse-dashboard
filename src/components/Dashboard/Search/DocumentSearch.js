import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styled from 'styled-components'
import ResultsList from './ResultsList'
import DocumentService from '../../../services/DocumentService'
import SearchService from '../../../services/SearchService'
import ColorPalette from '../../../constants/ColorPalette'

const Filters = styled.div`
  width: 98%;
  margin: 0px auto;
  padding: 0px 4px;
  display: flex;
`;

const ResultsTitle = styled.h2`
  padding-left: 15px;
  margin: 10px 0;
`;

const Results = styled.div`
  margin: 10px 20px;
  background: ${ ColorPalette.endorse_white };
  color: ${ ColorPalette.endorse_primary_dark };
  box-shadow: 0px 1px 5px 1px rgba(100,100,100, .4);
`;

const TagsPlaceholder = styled.label`
  color: darkgray;
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
`;

class DocumentSearch extends Component {

  constructor(props) {
    super(props);
    this.state = { name: [], search_term: '', search_tags: [], results: [], tags: [], loading: true };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleDocumentSearch = this.handleDocumentSearch.bind(this);
    this.handleTagSelection = this.handleTagSelection.bind(this);
    this.searchService = new SearchService(this.props.projectUUID);
  }

  componentWillMount() {
    DocumentService.getAllTags(false, this.props.projectUUID).then((tags) => {
      this.setState({ tags: tags, loading: false })
    })
  }

  onSearchChange(event) {
    this.setState({search_term: event.target.value});
  }

  handleChange = event => {
    this.setState({ search_tags: event.target.value });
  };

  handleTagSelection(event) {
    console.log(event);
    let search_tags = [].concat(this.state.search_tags, event.target.value);
    this.setState({search_tags: search_tags});
  }

  async handleDocumentSearch() {
    this.searchService.documentSearch(this.state.search_term, this.state.search_tags, '2019-01-01T00:00:00+00:00', '2019-31-03T00:00:00+00:00').then((results) => {
      this.setState({
        results: results.data.hits.hits
      });
    });
  }

  render() {
    if (this.state.loading) { return (<h2>Loading...</h2>) }
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <FormControl className={classes.formControl}>
            <Select
              style={{margin: 0}}
              multiple
              displayEmpty
              value={this.state.search_tags}
              onChange={this.handleChange}
              input={<Input id="select-multiple-placeholder" disableUnderline={true}/>}
              renderValue={selected => selected.length === 0 ? <TagsPlaceholder>Tags</TagsPlaceholder> : selected.join(', ')}>
              <MenuItem disabled value=""><em>Tags</em></MenuItem>
              {this.state.tags.map((tag) => <MenuItem key={tag} value={tag}> {tag} </MenuItem> )}
            </Select>
          </FormControl>
          <Divider className={classes.divider} />
          <InputBase
            className={classes.input}
            placeholder="Search documents"
            onChange={ this.onSearchChange }/>
          <Divider className={classes.divider} />
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            onClick={ this.handleDocumentSearch }>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Filters>

        </Filters>
        {this.state.results.length > 0 &&
          <ResultsTitle>Search results:</ResultsTitle>
        }
        <Results>
          <ResultsList data={this.state.results} />
        </Results>
      </div>
    )
  }
}

DocumentSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    margin: '10px auto 0px auto',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '98%',
  },
  formControl: {
    marginLeft: 10,
    minWidth: 100,
    maxWidth: 150
  },
  input: {
    margin: 0,
    padding: 0,
    flex: 1,
  },
  label: {
    position: 'relative'
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  }
});

export default withStyles(styles)(DocumentSearch)