import React from 'react';
import cl from './Navbar.module.css'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div>

            <div className={cl.navbar}>
                <Link to="/sort">Sorting</Link>
                <Link to="/pathfinding">Pathfinding</Link>
                <Link to="/">About</Link>
            </div>
        </div>
    );
};

export default Navbar;