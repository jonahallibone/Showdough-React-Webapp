import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter,
    Redirect
} from 'react-router-dom'
import Login from "../Login/Login";
import "./Layout.css";
import PageHeader from '../PageHeader/PageHeader';
import MainList from '../MainList/MainList';
import PostEditor from "../PostEditor/PostEditor";
import Profile from "../Profile/Profile";
import {withFirebase} from "../Firebase"
import AddBusiness from '../AddBusiness/AddBusiness';
import BusinessEventList from '../BusinessEventList/BusinessEventList';
import EventMembers from '../EventMembers/EventMembers';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
class Layout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { location, history, match } = this.props;
        const { user } = this.props.firebase;

        return (
                <div className="app-layout">
                    <div className="layout-app-content">
                        <PageHeader history={history}></PageHeader>
                        <div className="layout-content-scroll">
                            <Switch history={history}>
                                <Route exact path="/events" component={MainList}/> 
                                <Route exact path="/new-event" component={PostEditor}/> 
                                <Route exact path="/login" render={() => (
                                    user ?
                                    (
                                        <Redirect to="/profile" />
                                    ) : (
                                        <Login />
                                    )
                                )} />
                                <Route exact path="/profile" render={() => (
                                    user ?
                                    (
                                        <Profile />
                                    ) : (
                                        <Redirect to="/login" />
                                    )
                                )} />
                                <Route exact path="/create" component={PostEditor}/>
                                <Route exact path="/business" component={AddBusiness}/>
                                <Route exact path="/business/events" component={BusinessEventList} />
                                <Route exact path="/business/events/:id" component={EventMembers} />
                                <Route exact path="/profile/settings" component={ProfileSettings} />
                            </Switch>                        
                        </div>
                    </div>
                </div>
        )
    }
}

export default withRouter(withFirebase(Layout));
