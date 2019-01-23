import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, Button } from '@material-ui/core';
import FileCard from './FileCard'
import {File} from "react-filepond";

const TagsContainer = styled.div`
   padding: 10px 8px 0px 8px;
   text-align: center;
`;

class TagFiles extends Component {
   constructor(props) {
     super(props);
     this.state = {
       files: this.props.files
     }
   }

   render() {
     return(
       <TagsContainer>
         {
           this.state.files.map(file =>
             <FileCard key={file.name} file={file} />
           )
         }
       </TagsContainer>
     )
   }
}

export default TagFiles