import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'filepond/dist/filepond.min.css';
import Home from './containers/Home/HomeContainer';
import Dashboard from './containers/Dashboard/DashboardContainer';
import Projects from './containers/Projects/ProjectsContainer';
import Contact from './containers/Contact/Contact';
import ProjectVisualization from "./containers/Visualization/ProjectVisualization";
import Login from './containers/Login/LoginContainer';

class App extends Component {
	render() {
		return (
		  <Router>
        <Switch>
          <Route path={"/contact"} component = {Contact}/>
          <Route path={"/dashboard/:projectUUID"} component = {Dashboard}/>
          <Route path={"/projects-overview"} component = {Projects}/>
          <Route path={"/visualization"} component = {ProjectVisualization}/>
          <Route path={"/login"} component = {Login}/>
          <Route path={"/"} component = {Home}/>
        </Switch>
      </Router>
		);
	}
}

export default App;