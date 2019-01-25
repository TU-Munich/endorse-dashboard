import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import FileCard from './FileCard'

const TagsContainer = styled.div`
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
         <Grid container spacing={8}>
           {
             this.state.files.map(file =>
               <Grid key={file.name} item xs={12} sm={12} md={6} lg={4}>
                 <FileCard file={file} />
               </Grid>
             )
           }
         </Grid>
       </TagsContainer>
     )
   }
}

export default TagFiles