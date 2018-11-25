import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UploadFiles from "../UploadFiles/UploadFiles";
import ExternalLink from "../ExternalLink/ExternalLink";
import KibanaDashboard from "../KibanaDashboard/KibanaDashboard";

const ContentContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex nowrap;
`;

class Dashboard_Content extends Component {
    render() {
        return (
            <ContentContainer>
                <Switch>
                    <Route path={"/dashboard/upload_files/:id"} component={UploadFiles}/>
                    <Route path="/dashboard/external_link/:id" component={ExternalLink}/>
                    <Route path="/dashboard/kibana_dashboard/:id" component={KibanaDashboard}/>
                </Switch>
            </ContentContainer>
        );
    }
}

export default Dashboard_Content