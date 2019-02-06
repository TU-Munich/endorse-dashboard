import React, { Component } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import ChartsIcon from '@material-ui/icons/TrendingUp';
import ViewIcon from '@material-ui/icons/Visibility';

const Ribbon = styled.div`
  width: 10px;
  height: 0px;
  background-color: green;
  position: relative;
  left: -5px;
  top: -34px;
	
	&::before {
		content: '';
		position: relative;
		z-index: 2;
		left: 0;
		bottom: -10px;
		border-left: 5px solid green;
		border-right: 5px solid green;
		border-bottom: 5px solid transparent;
	}
`;

const ListItem = styled.li`
  display: flex;
  margin: 0;
  border-bottom: 1px solid lightgray;
  justify-content: space-between;
  align-items: center;
  
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

const ListItemActions = styled.div`
  flex-shrink: 0;
  padding-left: 0.7em;
  align-items: flex-start;
  
  &:hover {
    cursor: pointer;
  }
`;

const DownloadButton = styled(IconButton)`
  &:hover {
    color: #ffffff;
  }
`;

const StatisticsButton = styled(IconButton)`
  &:hover {
    color: #b962b9;
  }
`;

const ViewButton = styled(IconButton)`
  &:hover {
    color: #51b5d6;
  }
`;

const DeleteButton = styled(IconButton)`
  &:hover {
    color: red;
  }
`;

class ResultListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      download_link: this.props.document._source.file_path,
      document_id: this.props.document._id
    }
  }

  render() {
    return (
      <ListItem>
        <Ribbon class={'ribbon'} />
        <ItemLabel>{ 'Document super awesome.pdf' }</ItemLabel>
        <ListItemActions>
          <DownloadButton aria-label="Download"
                          style={{transition: 'none', borderRadius: 0}}
                          onClick={() => alert(this.state.download_link)}>
            <DownloadIcon />
          </DownloadButton>
          <ViewButton aria-label="View"
                      style={{transition: 'none', borderRadius: 0}}
                      onClick={() => alert(this.state.document_id)}>
            <ViewIcon />
          </ViewButton>
          <StatisticsButton aria-label="Statistics" style={{transition: 'none', borderRadius: 0}}>
            <ChartsIcon />
          </StatisticsButton>
          <DeleteButton aria-label="Delete" style={{transition: 'none', borderRadius: 0}}>
            <DeleteIcon />
          </DeleteButton>
        </ListItemActions>
      </ListItem>
    );
  }
}

export default ResultListItem