import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Project from "../Project/createProjectForm";
import Project from "../Project/Project";
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

class Dashboard_Content extends Component {
    render() {
        return (
            <ContentContainer>
                <Switch>
                    <Route path={"/dashboard/dashboard/:id"} component={DashboardInfo}/>
                    <Route path={"/dashboard/project/:id"} component={Project}/>
                    <Route path={"/dashboard/upload_files/:id"} component={UploadFiles}/>
                    <Route path="/dashboard/external_link/:id" component={ExternalLink}/>
                    <Route path="/dashboard/kibana_dashboard/:id" component={KibanaDashboard}/>

                </Switch>
            </ContentContainer>
        );
    }
}

export default Dashboard_Content