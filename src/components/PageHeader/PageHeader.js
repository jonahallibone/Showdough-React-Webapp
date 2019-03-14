import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Link} from "react-router-dom";
import { FiBell, FiHome, FiHelpCircle, FiCalendar, FiSearch } from "react-icons/fi";

import "./PageHeader.css";
import { withFirebase } from '../Firebase/context';

class PageHeader extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            menuVisible: false
        }
    }

    logout = () => {
        this.props.firebase.firebase.doSignOut();
    }

    goToProfile = () => {
        const {history} = this.props;
        history.push("/profile")
    }
    

    render() {
        const {user} = this.props.firebase;
        return(
            <header className="page-header">
                <div className="header-right">
                    <h3>ShowDough</h3>
                    <div className="page-header-search"> 
                        <FiSearch size="1.23rem" color="#747d8c"/>
                        <input placeholder="Search All Events"/>
                    </div>
                </div>
                <div className="header-left">
                    <Link to="/" className="header-link">
                        <FiHome size="1.23rem" color="#747d8c"/>
                        Home
                    </Link>
                    <Link to="/events" className="header-link">
                        <FiCalendar size="1.23rem" color="#747d8c"/>
                        Events
                    </Link>
                    <Link to="/help" className="header-link">
                        <FiHelpCircle size="1.23rem" color="#747d8c"/>
                        Help
                    </Link>
                    <button className="noti-button">
                        <FiBell size="1.23rem" color="#747d8c"/>
                    </button>
                    {
                        this.props.firebase.user ? 
                            <span className="profile-button" tabIndex="-1">
                                {user.displayName}
                                <div className="header-drop-down">
                                    <div className={`header-profile-menu ${this.state.menuVisible ? "visible" : ""}`}>
                                        <button onClick={this.goToProfile}>
                                            Profile
                                        </button>
                                        <button onClick={this.logout}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </span>
                        :
                            <Link to="/login" className="profile-button">Login</Link>
                    }
                </div>
            </header>
        )
    }
}

export default withFirebase(PageHeader);