import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa'
import logo from "../images/logo.svg";
export class Navbar extends Component {
    state = {
        isOpen: false
    };
    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    render() {
        return (
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to='/'>
                            <img className="logo" src={logo} alt='TsaR Resort' />
                        </Link>
                        <button type="button" className="nav-btn" onClick={this.handleToggle}>
                            <FaAlignRight className="nav-icon" />
                        </button>
                    </div>
                    <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                        <li>
                            <Link to='/'>HOME</Link>
                        </li>
                        <li>
                            <Link to='/rooms'>ROOMS</Link>
                        </li>
                        <li>
                            <Link to='/about-us'>ABOUT US</Link>
                        </li>
                        <li>
                            <Link to='/contact'>CONTACT</Link>
                        </li>


                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
