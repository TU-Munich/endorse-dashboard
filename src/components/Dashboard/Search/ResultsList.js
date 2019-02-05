import React, { Component } from 'react';
import styled from 'styled-components';
import ResultListItem from './ResultListItem'

const ResultsListComponent = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

class ResultsList extends Component {

  render() {
    return (
      <ResultsListComponent>
        <ResultListItem/>
        <ResultListItem/>
        <ResultListItem/>
        <ResultListItem/>
        <ResultListItem/>
        <ResultListItem/>
        <ResultListItem/>
        <ResultListItem/>
        <ResultListItem/>
        <ResultListItem/>
        <ResultListItem/>
        <ResultListItem/>
      </ResultsListComponent>
    );
  }
}

export default ResultsList