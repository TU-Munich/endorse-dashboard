import React, { Component } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import ChartsIcon from '@material-ui/icons/TrendingUp';
import ViewIcon from '@material-ui/icons/Visibility';
import Modal from "@material-ui/core/Modal/Modal";
import DocumentDetailView from './DocumentDetailView'
import DashboardInfo from "../DashboardInfo/DashboardInfo";

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
      documentViewOpen: false,
      chartsViewOpen: false
    };
    this.handleOpenDocumentModal = this.handleOpenDocumentModal.bind(this);
    this.handleCloseDocumentModal = this.handleCloseDocumentModal.bind(this);
    this.handleOpenChartsModal = this.handleOpenChartsModal.bind(this);
    this.handleCloseChartsModal = this.handleCloseChartsModal.bind(this);
  }

  handleOpenDocumentModal = () => {
    this.setState({ documentViewOpen: true });
  };

  handleCloseDocumentModal = () => {
    this.setState({ documentViewOpen: false });
  };

  handleOpenChartsModal = () => {
    this.setState({ chartsViewOpen: true });
  };

  handleCloseChartsModal = () => {
    this.setState({ chartsViewOpen: false });
  };

  handleOpenVisualizations = () => {
    window.localStorage.removeItem('document_id');
    window.localStorage.setItem('document_id', this.props.document._id);
    this.props.history.push('/dashboard/visualization_charts');
  };

  render() {
    let download_link = this.props.document._source.file_path;
    let document_name = this.props.document._source.file_path.match(/[(_\-)a-zA-Z0-9]+(\.)+([a-zA-Z]{3,})/g);
    return (
      <ListItem>
        <Ribbon class={'ribbon'} />
        <ItemLabel>{ document_name.toString().replace(/_/g, ' ') }</ItemLabel>
        <ListItemActions>
          <DownloadButton aria-label="Download"
                          style={{transition: 'none', borderRadius: 0}}
                          onClick={() => alert(download_link)}>
            <DownloadIcon />
          </DownloadButton>
          <ViewButton aria-label="View"
                      style={{transition: 'none', borderRadius: 0}}
                      onClick={this.handleOpenDocumentModal}>
            <ViewIcon />
          </ViewButton>
          <StatisticsButton aria-label="Statistics"
                            style={{transition: 'none', borderRadius: 0}}
                            onClick={this.handleOpenChartsModal}>
            <ChartsIcon />
          </StatisticsButton>
          <DeleteButton aria-label="Delete"
                        style={{transition: 'none', borderRadius: 0}}
                        onClick={() => this.props.handleDocumentDelete(this.props.document._id)}>
            <DeleteIcon />
          </DeleteButton>
        </ListItemActions>
        <Modal open={this.state.chartsViewOpen}
               onClose={this.handleCloseChartsModal}
               style={{width: '80%', margin: 'auto'}}
               disableAutoFocus={true}>
          <DashboardInfo projectUUID={window.localStorage.getItem('projectUUID')} document_id={this.props.document._id} />
        </Modal>
        <Modal open={this.state.documentViewOpen}
               onClose={this.handleCloseDocumentModal}
               disableAutoFocus={true}>
          <DocumentDetailView document_id={this.props.document._id} />
        </Modal>
      </ListItem>
    );
  }
}

export default ResultListItem