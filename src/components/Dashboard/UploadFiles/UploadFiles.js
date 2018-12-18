import React, {Component} from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import {FilePond, File} from 'react-filepond';
import {nlpServiceBaseUrl} from '../../../config';

const ContainerDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;	
  margin: 10px; 
   
  text-align: center;
  margin-top:20px;
  max-width: 90%;	
`;

const UploadContainer = styled.div`
   padding: 10px 8px 0px 8px;
   text-align: center;
`;

class UploadFiles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      files: []
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
                      server={nlpServiceBaseUrl + "/files/upload"}
                      oninit={() => this.handleFilePondInit()}
                      onupdatefiles={(fileItems) => {
                        this.setState({
                          files: fileItems.map(fileItem => fileItem.file)
                        });
                      }}>
              {
                this.state.files.map(file => (
                  <File key={file} src={file} origin="local"/>
                ))
              }
            </FilePond>
          </UploadContainer>
        </Card>
      </ContainerDiv>
    );
  }
}

export default UploadFiles;
