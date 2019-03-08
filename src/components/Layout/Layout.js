import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter
} from 'react-router-dom'
import Navigation from "../Navigation/Navigation";
import Login from "../Login/Login";
import "./Layout.css";
import PageHeader from '../PageHeader.css/PageHeader';
import MainList from '../MainList/MainList';
import PostEditor from "../PostEditor/PostEditor";
import Profile from "../Profile/Profile";

class Layout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { location, history, match } = this.props;
        // console.log(this.props);
        return (
                <div className="app-layout">
                    <div className="layout-app-content">
                        <PageHeader history={history}></PageHeader>
                        <div className="layout-content">
                            <Switch history={history}>
                                <Route exact path="/events" component={MainList}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/create" component={PostEditor}/>
                                <Route exact path="/profile" component={Profile}/>
                            </Switch>                        
                        </div>
                    </div>
                </div>
        )
    }
}

export default withRouter(Layout);
