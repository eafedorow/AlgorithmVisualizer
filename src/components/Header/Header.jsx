import React from 'react';
import cl from './Header.module.css'
import Navbar from "../Navbar/Navbar";
import Switch from "../Switch/Switch";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={cl.header}>
            <Link to="/" className={cl.logo}>
                <img className={cl.logoImg} src="logo.png" alt="logo"/>
                <p className={cl.title}>Algorithm Visualizer</p>
            </Link>
            <Navbar/>
        </div>
    );
};

export default Header;