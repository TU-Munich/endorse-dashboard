import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'filepond/dist/filepond.min.css';
import Home from './containers/Home/HomeContainer';
import Dashboard from './containers/Dashboard/DashboardContainer';
import Projects from './containers/Projects/ProjectsContainer';
import Contact from './containers/Contact/Contact';
import Login from './containers/Login/LoginContainer';

class App extends Component {
  componentWillMount() {
    window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
  }

	render() {
		return (
		  <Router>
        <Switch>
          <Route path={"/contact"} component = {Contact}/>
          <Route path={"/dashboard/:projectUUID"} component = {Dashboard}/>
          <Route path={"/projects-overview"} component = {Projects}/>
          <Route path={"/login"} component = {Login}/>
          <Route path={"/"} component = {Home}/>
        </Switch>
      </Router>
		);
	}
}

export default App;