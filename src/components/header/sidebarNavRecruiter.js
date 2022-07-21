import React, {useState} from 'react';
// import LogIn from '../modals/logIn';
// import Register from '../modals/register'; 

import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

// import {Navbar, Nav, I, Sidebar} from '../../styles/components/sidebarNav';
import './styles/sidebarNav.css';

const SidebarNavRecruiter = () => {
    
    //SIDEBAR ACTIVATION FUNCTIONS
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <div className="nav-container">
                <div className="sidebar-nav">
                    <div className="navbar">
                            <FaIcons.FaBars onClick={showSidebar} />
                    </div>

                    <nav className={ sidebar ? "nav-menu active" : "nav-menu"}>
                        <ul className="nav-menu-items" onClick={showSidebar}>
                            <li className="nav-bar-toggle">
                                <Link to='#' className="menu-bars">
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/">
                                    <span>home</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/about">
                                    <span>about voost</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/jobs">
                                    <span>Jobs</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/voost-rooms">
                                    <span>Voost rooms</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/post-job">
                                    <span>post a job</span>
                                </Link>
                            </li>
                            <li className="nav-text">
                                <Link to="/accountRecruiter">
                                    <span>account</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div> 
        </>
    )
}

export default SidebarNavRecruiter;