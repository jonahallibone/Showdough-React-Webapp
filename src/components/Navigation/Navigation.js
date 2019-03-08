import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiList, FiUser, FiTag, FiLock } from "react-icons/fi";
import {Link} from "react-router-dom";
import "./Navigation.css";

class Navigation extends Component {
    render() {
        return(
            <div className="lists">
                <ul>
                    <li><FiUser color="#747d8c"/><Link to="/login">Login</Link></li>
                    <li><FiTag color="#747d8c"/><Link to="/events">Events</Link></li>
                    <li><FiList color="#747d8c"/>Saved Events</li>
                    <li><FiLock color="#747d8c"/>Privacy</li>
                </ul>
            </div>
        )
    }
}

export default Navigation;