import React from 'react'
import "./Navbar.css"
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.jpg";
import seacch from "../../assets/search.png"
import upload from "../../assets/upload.png"
import notification from "../../assets/notification.png"
import more from "../../assets/more.png"
import profile from "../../assets/jack.png"
import { Link } from 'react-router-dom';
const Navbar = ({ setSidebar }) => {
    return (
        <div>
            <nav className="flex-div">
                <div className="nav-left flex-div">
                    <img className='menu-icon' onClick={() => setSidebar(prev => prev === false ? true : false)} src={menu_icon} alt="This is menu" />
                    <Link to='/'><img src={logo} alt="" className="logo" /></Link>

                </div>
                <div className="nav-middle flex-div">
                    <div className="search-box flex-div">
                        <input type="text" placeholder='Search...' />
                        <img src={seacch} alt="" className="search" />
                    </div>
                </div>
                <div className="nav-right flex-dev">
                    <img src={upload} alt="" />
                    <img src={more} alt="" />
                    <img src={notification} alt="" />
                    <img src={profile} className='user_icon' alt="" />
                </div>
            </nav>
        </div>
    )
}

export default Navbar
