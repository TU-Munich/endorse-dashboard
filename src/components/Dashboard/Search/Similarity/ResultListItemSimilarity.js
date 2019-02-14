import React, { Component } from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

const Ribbon = styled.div`
  width: 10px;
  height: 0px;
  background-color: #b5b53d; 
  position: relative;
  left: -5px;
  top: -34px;
	
	&::before {
		content: '';
		position: relative;
		z-index: 2;
		left: 0;
		bottom: -10px;
		border-left: 5px solid #b5b53d;
		border-right: 5px solid #b5b53d;
		border-bottom: 5px solid transparent;
	}
`;

const ListItem = styled.li`
  display: flex;
  margin: 0;
  border-bottom: 1px solid lightgray;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #d3d3d357;
  }
`;

const ItemLabel = styled.span`
  position: absolute;
  padding-left: 10px;
`;

class ResultListItemSimilarity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tooltip title={`Document origin: similarity search`} placement="top">
        <ListItem>
          <Ribbon class={'ribbon'}/>
          <ItemLabel>{this.props.result}</ItemLabel>
        </ListItem>
      </Tooltip>
    );
  }
}

export default ResultListItemSimilarity