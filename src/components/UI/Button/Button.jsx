import React from 'react';
import cl from './Button.module.css'

const Button = ({children, onClick, ...props}) => {
    return (
        <div>
            <button onClick={onClick} className={cl.button} {...props}>{children} </button>
        </div>
    );
};

export default Button;