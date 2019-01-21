import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, Button } from '@material-ui/core';
import {FilePond, File} from 'react-filepond';
import TagFiles from './TagFiles'
import {nlpServiceBaseUrl} from '../../../config';

const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  margin: 50px; 
   
  text-align: center;
  margin-top:20px;
  max-width: 90%;	
`;

const UploadContainer = styled.div`
   padding: 10px 8px 0px 8px;
   text-align: center;
`;

const AddTagsButton = styled(Button)`
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
      projectUUID: this.props.projectUUID,
      addTagsVisible: false
    };

    this.clickState = this.clickState.bind(this);
  }

  clickState() {
    this.setState({data: 'Test'});
    console.log(this.state.files);
  }

  handleFilePondInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  handleAddTagsClick() {
    this.setState({
      addTagsVisible: !this.state.addTagsVisible
    }, () => {
      console.log(this.state.addTagsVisible)
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
                      maxFiles={10}
                      server={""}
                      //server={nlpServiceBaseUrl + `/files/project/${this.state.projectUUID}/file`}
                      oninit={() => this.handleFilePondInit()}
                      onupdatefiles={(fileItems) => {
                        this.setState({
                          files: fileItems.map(fileItem => fileItem.file)
                        });
                      }}>
              {
                this.state.files.map(file => (
                  <File key={file} src={file} origin="local"/>
                )) && console.log(this.state.files)
              }
            </FilePond>
            {this.state.files.length > 0 &&
              <AddTagsButton variant="contained" color="primary" onClick={() => { this.handleAddTagsClick()}}>
                Add Tags
              </AddTagsButton>
            }
          </UploadContainer>
        </Card>
        <br />
        {this.state.addTagsVisible && this.state.files.length > 0 &&
          <Card style={{padding: "10px 10px 10px"}}>
            <TagFiles files={this.state.files} />
          </Card>
        }
      </ContainerDiv>
    );
  }
}

export default UploadFiles;
