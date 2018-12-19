import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'filepond/dist/filepond.min.css';
import HomeContainer from './containers/Home/HomeContainer';
import Dashboard from './containers/Dashboard/DashboardContainer';
import Contact from './containers/Contact/Contact';
import LoginContainer from './containers/Login/LoginContainer'
import ProjectVisualization from "./containers/Visualization/ProjectVisualization";

class App extends Component {
	render() {
		return (
		  <Router>
        <Switch>
          <Route path={"/contact"} component = {Contact}/>
          <Route path={"/dashboard"} component = {Dashboard}/>
          <Route path={"/login"} component = {LoginContainer}/>
            <Route path={"/visualization"} component = {ProjectVisualization}/>
          <Route path={"/"} component = {HomeContainer}/>
        </Switch>
      </Router>
		);
	}
}

export default App;