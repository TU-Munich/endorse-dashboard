import React, { Component } from 'react';
import styled from 'styled-components';
import ResultListItemSimilarity from './ResultListItemSimilarity'

const ResultsListComponent = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
  &:hover {
    cursor: pointer;
  }
`;

class ResultsListSimilarity extends Component {

  render() {
    return (
      <ResultsListComponent>
        {this.props.data.map((result, i) =>
            <ResultListItemSimilarity key={i} result={result} />
        )}
      </ResultsListComponent>
    );
  }
}

export default ResultsListSimilarity