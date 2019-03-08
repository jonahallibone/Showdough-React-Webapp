import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Link} from "react-router-dom";
import { FiBell, FiHome, FiHelpCircle, FiCalendar, FiSearch } from "react-icons/fi";

import "./PageHeader.css";
import { withFirebase } from '../Firebase/context';

class PageHeader extends Component {
    constructor(props) {
        super(props);
        
    }
    

    render() {
        const {user} = this.props.firebase;
        console.log(user);
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
                            <Link to="/profile" className="profile-button">{user.displayName}</Link>
                        :
                            <Link to="/login" className="profile-button">Login</Link>
                    }
                </div>
            </header>
        )
    }
}

export default withFirebase(PageHeader);