import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {Link} from "react-router-dom";
import { FiBell, FiUser, FiMenu, FiHome, FiHelpCircle, FiCalendar, FiSearch, FiLogOut, FiLogIn } from "react-icons/fi";

import "./PageHeader.css";
import { withFirebase } from '../Firebase/context';

function PageHeader(props) {
    console.log(props);
    const [menuVisible, setMenuVisible] = useState(false);
    const [sideNavigationOpen, setSideNavigationOpen] = useState(false);

    const logout = () => {
        props.firebase.firebase.doSignOut();
    }

    const goToProfile = () => {
        const {history} = props;
        history.push("/profile")
    }
    

    const {user} = props.firebase;

    return(
        <header className="page-header">
            <div className="header-right">
                <h3 style={{color: "#FFF"}}>ShowDough</h3>
                <div className="page-header-search desktop"> 
                    <FiSearch size="1.13rem" color="#FFF"/>
                    <input placeholder="Search All Events"/>
                </div>
                <div className="hamburger mobile" onClick={() => setSideNavigationOpen(!sideNavigationOpen)}>
                    <FiMenu size="2rem" color="#FFF"/>
                </div>
            </div>
            <div className="header-left">
                <Link to="/" className="header-link">
                    <FiHome size="1.13rem" color="#FFF"/>
                    Home
                </Link>
                <Link to="/events" className="header-link">
                    <FiCalendar size="1.13rem" color="#FFF"/>
                    Events
                </Link>
                <Link to="/help" className="header-link">
                    <FiHelpCircle size="1.13rem" color="#FFF"/>
                    Help
                </Link>
                <button className="noti-button">
                    <FiBell size="1.13rem" color="#FFF"/>
                </button>
                {
                    props.firebase.user ? 
                        <span className="profile-button" tabIndex="-1">
                            {user.displayName}
                            <div className="header-drop-down">
                                <div className={`header-profile-menu ${menuVisible ? "visible" : ""}`}>
                                    <button onClick={goToProfile}>
                                        Profile
                                    </button>
                                    <button onClick={logout}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </span>
                    :
                        <Link to="/login" className="profile-button">Login</Link>
                }
            </div>
            <div className="navigation-sidebar" open={sideNavigationOpen}>
                <div className="navigation-sidebar--header">
                    <h3 style={{marginLeft: "30px"}}>Menu</h3>
                    <div className="hamburger" onClick={() => setSideNavigationOpen(!sideNavigationOpen)}>
                        <FiMenu size="2rem" color="#00D770"/>
                    </div>
                </div>
                <div className="navigation-side--nav-list">
                    {
                        props.firebase.user ? 
                            <>
                                <div className="header-link" onClick={goToProfile}>
                                    <FiUser size="1.13rem" color="#00D770"/>
                                    {user.displayName}
                                </div>
                                <div className="header-link" onClick={logout}>
                                    <FiLogOut size="1.13rem" color="#00D770" />
                                    Logout
                                </div>
                            </>
                        :
                        <Link to="/login" className="header-link">
                            <FiLogIn size="1.13rem" color="#00D770"/>
                            Log in
                        </Link>
                    }
                    <Link to="/" className="header-link">
                        <FiHome size="1.13rem" color="#00D770"/>
                        Home
                    </Link>
                    <Link to="/events" className="header-link">
                        <FiCalendar size="1.13rem" color="#00D770"/>
                        Events
                    </Link>
                    <Link to="/help" className="header-link">
                        <FiHelpCircle size="1.13rem" color="#00D770"/>
                        Help
                    </Link>
                    <Link to="/notifications" className="header-link">
                        <FiBell size="1.13rem" color="#00D770"/>
                        Notifications
                    </Link>
                </div>
                    
            </div>
            <div className="page-header-search mobile"> 
                <FiSearch size="1.13rem" color="#FFF"/>
                <input placeholder="Search All Events"/>
            </div>
        </header>
    )
}

export default withFirebase(PageHeader);