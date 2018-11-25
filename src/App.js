import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from './containers/Home/Home';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {
	render() {
		return (
            <Router>
                <Switch>
                    <Route path={"/home"} component = {Home}/>
                    <Route path={"/dashboard"} component = {Dashboard}/>
                    <Route path={"/"} component = {Home}/>
                </Switch>
            </Router>

		);
	}
}

export default App;