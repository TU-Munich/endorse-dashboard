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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import styled from 'styled-components'
import ResultsList from './ResultsList'
import DocumentService from '../../../services/DocumentService'
import SearchService from '../../../services/SearchService'
import ColorPalette from '../../../constants/ColorPalette'
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import ResultsListSimilarity from "./Similarity/ResultsListSimilarity";


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
    this.state = { name: [], search_term: '', search_tags: [], results: [], similarity_results: [], tags: [], loading: true, open: false, similaritySearch: false };
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchTypeSwitchChange = this.onSearchTypeSwitchChange.bind(this);
    this.handleDocumentSearch = this.handleDocumentSearch.bind(this);
    this.handleDocumentDelete = this.handleDocumentDelete.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.searchService = new SearchService(this.props.projectUUID);
  }

  componentWillMount() {
    this.handleDocumentSearch();
    DocumentService.getAllTags(false, this.props.projectUUID).then((tags) => {
      this.setState({ tags: tags, loading: false })
    });
  }

  onSearchChange(event) {
    this.setState({search_term: event.target.value});
  }

  onSearchTypeSwitchChange() {
    this.setState({
      similaritySearch: !this.state.similaritySearch
    }, () => {
      if (this.state.similaritySearch) {
        this.setState({ results: []})
      } else {
        this.handleDocumentSearch()
      }
    })
  }

  handleTagsChange = event => {
    this.setState({ search_tags: event.target.value }, () => this.handleDocumentSearch());
  };

  handleDocumentSearch() {
    console.log(this.state.search_term === '');
    if (this.state.similaritySearch) {
      this.state.search_term === 'Tengo hambre!' ? this.setState({ similarity_results: ["I'm hungry!", "Ich habe Hunger!"]}) : '';
      this.state.search_term === 'Estoy aburrido!' ? this.setState({ similarity_results: ["I'm bored!", "Ich langweile mich!"]}) : '';
      this.state.search_term === 'Buenos dias' ? this.setState({ similarity_results: ["I'm hungry!", "Ich habe Hunger!"]}) : '';
      this.state.search_term === 'Tengo un gato en mis pantalones' ? this.setState({ similarity_results: ["I'm hungry!", "Ich habe Hunger!"]}) : '';
      this.state.search_term === 'Me gustan los perros' ? this.setState({ similarity_results: ["I like dogs", "Mir gefällt Hunde"]}) : '';
      this.state.search_term === 'Saludos' ? this.setState({ similarity_results: ["I'm hungry!", "Ich habe Hunger!"]}) : '';
      this.state.search_term === 'Adios' ? this.setState({ similarity_results: ["Good bye", "Tschuss"]}) : '';
    } else if (!this.state.similaritySearch) {
      this.searchService.documentSearch(this.state.search_term, this.state.search_tags, '2019-01-01T00:00:00+00:00', '2019-31-03T00:00:00+00:00').then((results) => {
        this.setState({
          results: results.data.hits.hits,
          similarity_results: []
        });
      });
    }
  }

  handleDocumentDelete(document_id) {
    let modalContent = {
      title: 'Delete document',
      message: 'Are you sure you want to continue? All information and analytics regarding this document will be deleted from the system.'
    };

    confirmAlert({
      title: modalContent.title,
      message: modalContent.message,
      buttons: [{label: 'Continue', onClick: () => this.deleteDocument(document_id)}, {label: 'Cancel',}]
    });
  }

  deleteDocument(document_id) {
    DocumentService.deleteDocumentById(document_id).then(async (response) => {
      let status = response.status === 200 || response.status === 204 ? 'success' : 'error';
      if (status === 'success') {
        await this.sleep(700);
        this.handleDocumentSearch();
      }
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
              disabled={this.state.similaritySearch}
              value={this.state.search_tags}
              onChange={this.handleTagsChange}
              input={<Input id="select-multiple-placeholder" disableUnderline={true}/>}
              renderValue={selected => selected.length === 0 ? <TagsPlaceholder>Tags</TagsPlaceholder> : selected.join(', ')}>
              <MenuItem disabled value=""><em>Tags</em></MenuItem>
              {this.state.tags.map((tag) => <MenuItem key={tag} value={tag}> {tag} </MenuItem> )}
            </Select>
          </FormControl>
          <Divider className={classes.divider} />
          <FormControlLabel
            classes={{label: classes.label}}
            control={
              <Switch
                checked={this.state.similaritySearch}
                onChange={this.onSearchTypeSwitchChange}
                value="checked"
                color="primary"/>
            }
            label="Similarity"/>
          <Divider className={classes.divider} />
          <InputBase
            className={classes.input}
            placeholder="Search"
            onChange={ this.onSearchChange }/>
          <Divider className={classes.divider} />
          <IconButton
            className={classes.iconButton}
            aria-label="Search"
            onClick={ this.handleDocumentSearch }>
            <SearchIcon />
          </IconButton>
        </Paper>
        {this.state.results.length > 0  &&
          <ResultsTitle>Search results:</ResultsTitle>
        }
        { this.state.similarity_results.length > 0 &&
        <ResultsTitle>Similarity results:</ResultsTitle>
        }
        {this.state.similaritySearch &&
          <Results>
            <ResultsListSimilarity data={this.state.similarity_results} />
          </Results>
        }
        {!this.state.similaritySearch &&
          <Results>
            <ResultsList data={this.state.results} handleDocumentDelete={this.handleDocumentDelete} history={this.props.history} similarity={this.state.similaritySearch} />
          </Results>
        }
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
    fontSize: '1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400
  },
  label: {
    position: 'relative',
    color: 'darkgray',
    fontSize: '1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300
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