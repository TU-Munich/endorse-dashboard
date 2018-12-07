import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import 'filepond/dist/filepond.min.css';
import Home from './containers/Home/Home';
import Dashboard from './containers/Dashboard/Dashboard';
import Contact from './containers/Contact/Contact';

class App extends Component {
	render() {
		return (
            <Router>
                <Switch>
                    <Route path={"/home"} component = {Home}/>
                    <Route path={"/contact"} component = {Contact}/>
                    <Route path={"/dashboard"} component = {Dashboard}/>
                    <Route path={"/"} component = {Home}/>

                </Switch>
            </Router>

		);
	}
}

export default App;