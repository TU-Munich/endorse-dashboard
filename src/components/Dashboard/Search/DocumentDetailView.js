import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import DocumentService from '../../../services/DocumentService';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tag from "../UploadFiles/Tag/Tag";

const ModalContent = styled.div`
  width: 80%;
  background-color: white;
  border-radius: 5px;
  margin: 50px auto;
  padding: 20px;
  overflow-y: scroll;
  max-height: 600px;
`;

const MetadataContainer = styled.div`
  width: 50%; 
  float: left;
`;

const PipelineDocument = styled.div`
  width: 50%; 
  float: right;
`;

class DocumentDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = { document: {}, loading: true, suggestions: [], existingTags: [] };
  }

  componentWillMount() {
    this.fetchDocumentInformation();
  }

  fetchDocumentInformation() {
    DocumentService.getDocumentById(this.props.document_id).then((response) => {
      this.setState({
        document: response.data.hits.hits[0],
        loading: false
      })
    });

    DocumentService.getAllTags(true, false).then((suggestions) => {
      this.setState({
        suggestions: suggestions
      })
    });

    DocumentService.getTagsByDocument(this.props.document_id).then((existingTags) => {
      this.setState({
        existingTags: existingTags
      })
    })
  }

  render() {
    const { classes } = this.props;

    if (this.state.loading) {
      return (<CircularProgress className={classes.progress}/>)
    }

    return (
      <ModalContent className={'modal-content'}>
        <MetadataContainer>
          <div>
            <h3>Document details</h3>
            <label><b>Filename:</b></label> Some nice name <br />
            <label><b>Filename:</b></label> Some nice name
          </div>
          <div>
            <h3>Document tags</h3>
            <Tag suggestions={this.state.suggestions} document_id={this.props.document_id} existingTags={this.state.existingTags} />
          </div>
        </MetadataContainer>
        <PipelineDocument>
          <ReactJson src={this.state.document} collapsed={false} />
        </PipelineDocument>
      </ModalContent>
    );
  }
}

const styles = theme => ({
  progress: {
    width: '70px !important',
    height: '70px !important',
    marginLeft: '50%',
    marginTop: '20%',
    color: 'white'
  },
});

DocumentDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DocumentDetailView);