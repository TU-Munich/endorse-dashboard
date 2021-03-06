import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, Button } from '@material-ui/core';
import { FilePond, File } from 'react-filepond';
import TagFiles from './TagFiles'
import { nlpServiceBaseUrl } from '../../../config';

const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  margin: 10px; 
   
  text-align: center;
  margin-top:20px;
  max-width: 100%;	
`;

const UploadContainer = styled.div`
   padding: 10px 8px 0px 8px;
   text-align: center;
`;

const AddTagsButton = styled(Button)`
  text-align: center;
  float: right;
`;

const AddMoreFilesButton = styled(Button)`
  text-align: center;
  float: right;
`;

class UploadFiles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      files: [],
      preFiles: [],
      uploadComplete: false,
      projectUUID: this.props.projectUUID,
      addTagsVisible: false
    };

    this.serverConfig = {
      url: nlpServiceBaseUrl,
      process: {
        url: `/files/project/${this.props.projectUUID}/file`,
        method: 'POST',
        onload: (response) => {
          this.state.preFiles.forEach((preFile) => {
            let jsonResponse = JSON.parse(response);
            let preFileName = preFile.name.replace(/ /g,"_");
            if (preFileName === jsonResponse.name) {
              preFile["_id"] = jsonResponse.result._id;
              this.setState({
                files: [].concat(this.state.files, preFile)
              });
            }
          });

          if (this.state.files.length === this.state.preFiles.length) {
            this.setState({
              uploadComplete: true
            });
          }
        },
      }
    }
  }

  handleFilePondInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  handleAddTagsClick() {
    this.setState({
      addTagsVisible: !this.state.addTagsVisible
    })
  }

  render() {
    if (this.state.loading) {
      return (<h2>Loading...</h2>);
    }

    return (
      <ContainerDiv>
        <Card style={{height: "300%", padding: "10px 10px 10px"}}>
          <h1>Local File Processing</h1>
          <p>Please select or drag the files you want to fetch into the processing system</p>
          <UploadContainer>
            <FilePond ref={ref => this.pond = ref}
                      allowMultiple={true}
                      allowRevert={false}
                      maxFiles={10}
                      server={this.serverConfig}
                      oninit={() => this.handleFilePondInit()}
                      onupdatefiles={(fileItems) => {
                        this.setState({
                          preFiles: fileItems.map(fileItem => fileItem.file)
                        });
                      }}>
              {
                this.state.preFiles.map(file => (
                  <File key={file} src={file} origin="local"/>
                ))
              }
            </FilePond>
            {
              this.state.files.length > 9 &&
              <AddMoreFilesButton variant="contained" color="secondary" onClick={() => { this.handleAddTagsClick()}}>
                Upload more
              </AddMoreFilesButton>
            }
            {this.state.files.length > 0 && this.state.uploadComplete &&
              <AddTagsButton variant="contained" color="primary" onClick={() => { this.handleAddTagsClick()}}>
                Add tags
              </AddTagsButton>
            }
          </UploadContainer>
        </Card>
        <br />
        <TagFiles files={this.state.files} projectUUID={this.state.projectUUID} visible={this.state.addTagsVisible} />
      </ContainerDiv>
    );
  }
}

export default UploadFiles;
