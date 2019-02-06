import React, { Component } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import UploadFiles from "./UploadFiles/UploadFiles";
import ExternalLink from "./ExternalLink/ExternalLink";
import DashboardInfo from "./DashboardInfo/DashboardInfo";
import VisualizationCharts from "./VisualizationCharts/VisualizationCharts";
import DocumentSearch from "./Search/DocumentSearch"

const ContentContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex nowrap;
`;

class DashboardContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectUUID: localStorage.getItem("projectUUID")
    };
  }

  render() {
    return (
      <ContentContainer>
        <Switch>
          <Route path={"/dashboard/info"} render={(props) => <DashboardInfo {...props} projectUUID={this.state.projectUUID} />}/>
          <Route path={"/dashboard/upload_files"} render={(props) => <UploadFiles {...props} projectUUID={this.state.projectUUID} />}/>
          <Route path={"/dashboard/external_link"} render={(props) => <ExternalLink {...props} projectUUID={this.state.projectUUID} />}/>
          <Route path={"/dashboard/visualization_charts"} render={(props) => <VisualizationCharts {...props} projectUUID={this.state.projectUUID} />}/>
          <Route path={"/dashboard/search"} render={(props) => <DocumentSearch {...props} projectUUID={this.state.projectUUID} />}/>
        </Switch>
      </ContentContainer>
    );
  }
}

export default DashboardContent