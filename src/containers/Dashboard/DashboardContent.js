import React, { Component } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import UploadFiles from "../UploadFiles/UploadFiles";
import ExternalLink from "../ExternalLink/ExternalLink";
import KibanaDashboard from "../KibanaDashboard/KibanaDashboard";
import DashboardInfo from "../DashboardInfo/DashboardInfo";


const ContentContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex nowrap;
`;

class DashboardContent extends Component {
    render() {
        return (
            <ContentContainer>
                <Switch>
                    <Route path={"/dashboard/dashboard/:id"} component={DashboardInfo}/>
                    <Route path={"/dashboard/upload_files/:id"} component={UploadFiles}/>
                    <Route path="/dashboard/external_link/:id" component={ExternalLink}/>
                    <Route path="/dashboard/kibana_dashboard/:id" component={KibanaDashboard}/>
                </Switch>
            </ContentContainer>
        );
    }
}

export default DashboardContent