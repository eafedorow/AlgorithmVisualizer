import React, {useState} from 'react';
import cl from './Switch.module.css'

const Switch = () => {

    const [theme, setTheme] = useState(false);

    const changeTheme = () => {
        theme ? setTheme(false) : setTheme(true);
    }

    return (
        <div>
            <span>{ theme ? "Dark Theme" : "Light Theme"}</span>
            <input onClick={changeTheme} type='checkbox' className={cl.ios8Switch} id='checkbox-1'/>
        </div>
    );
};

export default Switch;