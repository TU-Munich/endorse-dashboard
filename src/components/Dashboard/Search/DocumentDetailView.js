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
  width: 30%;
  float: left;
  padding-right: 14px;
  position: fixed;
`;

const PipelineDocument = styled.div`
  width: 60%; 
  float: right;
`;

const DetailHeadline = styled.h2`
  margin-bottom: 5px;
  margin-top: 10px;
`;

const DetailTitle = styled.h4`
  margin-bottom: 3px;
  margin-top: 10px;
  font-weight: bold;
`;

const MetadataSubsection = styled.div`
  height: 50%;
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
          <MetadataSubsection>
            <DetailHeadline>Document details:</DetailHeadline>
            <DetailTitle><b>File Name:</b></DetailTitle> { this.state.document._source.file_name } <br />
            <DetailTitle><b>File Language:</b></DetailTitle> { this.state.document._source.lang } <br />
            <DetailTitle><b>Origin:</b></DetailTitle> { this.state.document._source.origin } <br />
          </MetadataSubsection>
          <MetadataSubsection style={{marginTop: 50}}>
            <DetailHeadline>Edit document tags:</DetailHeadline>
            <Tag suggestions={this.state.suggestions} document_id={this.props.document_id} existingTags={this.state.existingTags} />
          </MetadataSubsection>
        </MetadataContainer>
        <PipelineDocument>
          <DetailHeadline style={{marginBottom: 15}}>Pipeline document:</DetailHeadline>
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