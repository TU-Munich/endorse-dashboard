import React, { Component } from 'react';
import styled from 'styled-components';
import ResultListItem from './ResultListItem'

const ResultsListComponent = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
  &:hover {
    cursor: pointer;
  }
`;

class ResultsList extends Component {

  render() {
    return (
      <ResultsListComponent>
        {this.props.data.map((result, i) =>
            <ResultListItem key={i} document={result} handleDocumentDelete={this.props.handleDocumentDelete} history={this.props.history}/>
        )}
      </ResultsListComponent>
    );
  }
}

export default ResultsList