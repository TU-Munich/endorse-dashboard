import React, {Component} from "react";
import styled from "styled-components";
import {Redirect, Route, Switch} from "react-router-dom";
import UploadFiles from "./UploadFiles/UploadFiles";
import ExternalLink from "./ExternalLink/ExternalLink";
import DashboardInfo from "./DashboardInfo/DashboardInfo";
import VisualizationCharts from "./VisualizationCharts/VisualizationCharts";

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
      projectUUID: this.props.params.params.projectUUID
    };
  }

  render() {
    return (
      <ContentContainer>
        <Switch>
          <Redirect exact from={`/dashboard/${this.state.projectUUID}`} to={"/dashboard/info"} />
          <Redirect exact from={`/dashboard/${this.state.projectUUID}/upload_files`} to={"/dashboard/upload_files"} />
          <Redirect exact from={`/dashboard/${this.state.projectUUID}/external_link`} to={"/dashboard/external_link"} />
          <Route path={"/dashboard/info"} render={(props) => <DashboardInfo {...props} projectUUID={this.state.projectUUID} />}/>
          <Route path={"/dashboard/upload_files"} render={(props) => <UploadFiles {...props} projectUUID={this.state.projectUUID} />}/>
          <Route path={"/dashboard/external_link"} render={(props) => <ExternalLink {...props} projectUUID={this.state.projectUUID} />}/>
          <Route path={"/dashboard/visualization_charts"} render={(props) => <VisualizationCharts {...props} projectUUID={this.state.projectUUID} />}/>
        </Switch>
      </ContentContainer>
    );
  }
}

export default DashboardContent