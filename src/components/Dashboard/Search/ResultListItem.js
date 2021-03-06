import React, { Component } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import ChartsIcon from '@material-ui/icons/TrendingUp';
import ViewIcon from '@material-ui/icons/Visibility';
import Modal from "@material-ui/core/Modal/Modal";
import Tooltip from '@material-ui/core/Tooltip';
import DocumentDetailView from './DocumentDetailView'
import DashboardInfo from "../DashboardInfo/DashboardInfo";
import config from '../../../config';

const Ribbon = styled.div`
  width: 10px;
  height: 0px;
  background-color: ${props => props.docType === 'upload' ? 'green' : '#b1170b'}; 
  position: relative;
  left: -5px;
  top: -34px;
	
	&::before {
		content: '';
		position: relative;
		z-index: 2;
		left: 0;
		bottom: -10px;
		border-left: 5px solid ${props => props.docType === 'upload' ? 'green' : '#b1170b'};;
		border-right: 5px solid ${props => props.docType === 'upload' ? 'green' : '#b1170b'};;
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

  render() {
    // /project/<string:projectUUID>/files/download/
    let download_link = config.nlpServiceBaseUrl + '/files/project/' + this.props.document._source.project_uuid + '/files/download/' + this.props.document._source.file_name;
    let document_name = this.props.document._source.file_name;
    return (
      <Tooltip title={`Document origin: ` + this.props.document._source.origin} placement="top">
        <ListItem>
          <Ribbon class={'ribbon'} docType={this.props.document._source.origin}/>
          <ItemLabel>{document_name}</ItemLabel>
          <ListItemActions>
            <DownloadButton aria-label="Download"
                            href={download_link}
                            style={{transition: 'none', borderRadius: 0}}
                            >
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
                 style={{width: '80%', margin: 'auto', zIndex: 3000}}
                 disableAutoFocus={true}>
            <DashboardInfo projectUUID={window.localStorage.getItem('projectUUID')} document_id={this.props.document._id} />
          </Modal>
          <Modal open={this.state.documentViewOpen}
                 onClose={this.handleCloseDocumentModal}
                 style={{zIndex: 3000}}
                 disableAutoFocus={true}>
            <DocumentDetailView document_id={this.props.document._id} />
          </Modal>
        </ListItem>
      </Tooltip>
    );
  }
}

export default ResultListItem