import React, { Component } from 'react';
import Home from 'screen/Home';
import Post from 'screen/Post';
import User from 'screen/User';
import PageNotFound from 'screen/PageNotFound';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class Routes extends Component {

    render() {

        return (
            <Router history={this.props.history}>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/post/:id' component={Post} />
                    <Route exact path='/user/:id' component={User} />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;
