import React, {useState} from 'react';
import cl from './Dropdown.module.css'

const Dropdown = ({selectedAlg, setSelectedAlg, options, ...props}) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className={cl.dropdown}>
            <div
                className={cl.dropdownBtn}
                onClick={e => setIsActive(!isActive)}
            >
                {selectedAlg}
                <span className={cl.arrowDown}></span>
            </div>
            {isActive && (
                <div className={cl.dropdownContent}>
                    {options.map(option => {
                        return (
                            <div
                                onClick={(e) => {
                                    setSelectedAlg(option)
                                    setIsActive(false)
                                }}
                                className={cl.dropdownItem}
                            >
                                {option}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default Dropdown;