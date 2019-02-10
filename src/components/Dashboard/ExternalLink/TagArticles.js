import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import ArticleCard from './ArticleCard'
import DocumentService from "../../../services/DocumentService";

const TagsContainer = styled.div`
   text-align: center;
   opacity: ${props => props.addTagsVisible ? '1;' : '0;'}
   transition: opacity .2s ease-out; 
`;

class TagArticles extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   suggestions: 'crawler'
    // };
    // DocumentService.getAllTags().then((existingTags) => {
    //   this.setState({
    //     suggestions: existingTags
    //     //suggestions: 'crawler'
    //   })
    // });
  }

  render() {
    return(
      <TagsContainer addTagsVisible={this.props.visible}>
        <Grid container spacing={8}>
          {
            this.props.files.map((file, i) =>
              <Grid key={i} item xs={12} sm={12} md={6} lg={4}>
                <ArticleCard file={file}  />
              </Grid>
            )
          }
        </Grid>
      </TagsContainer>
    )
  }
}

export default TagArticles