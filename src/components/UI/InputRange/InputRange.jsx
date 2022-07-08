import React, {useEffect, useState} from 'react';
import cl from './InputRange.module.css'

const InputRange = ({text, onInput, disabled, ...props}) => {

    const [inputValue, setInputValue] = useState(300);
    const [isHovered, setIsHovered] = useState(false);

    function changeOutput(value) {
        const output = document.querySelector('volume');
        setInputValue(value)
    }

    function handleHover() {
        if(!disabled) {
            setIsHovered(!isHovered)
        }
    }

    return (
        <div className={cl.container}>
            <div className={cl.slider} >
                <output style={{left: `${(inputValue / 4) - 45}px`}} className={cl.output + " " + (isHovered ? cl.visible: cl.disable)} htmlFor="fader" id="volume">{inputValue}</output>
                <input
                    type="range"
                    id="fader"
                    min="100"
                    max="1000"
                    step="1"
                    defaultValue="300"
                    onInput={(e) => {
                        changeOutput(e.target.value)
                        onInput(e)
                    }}
                    onMouseOver={handleHover}
                    onMouseOut={handleHover}
                    disabled={disabled}
                    {...props}
                />
            </div>
        </div>
    );
};

export default InputRange;