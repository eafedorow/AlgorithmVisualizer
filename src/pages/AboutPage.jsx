import React from 'react';
import Header from "../components/Header/Header";
import { Spring, animated } from 'react-spring'

const AboutPage = () => {
    return (
        <div>
            <Spring
                from={{opacity:0, transform: "translateX(-6rem)"}}
                to={{opacity:1, transform: "translateX(0rem)"}}
                config={{duration: 500}}
            >
                {props => (
                    <animated.div style={props}>
                        <div  className="app-info-wrapper">
                            <div  className="app-info">
                                <h1 className="title">Algorithm Visualizer</h1>
                                <hr/>
                                <span  style={{fontSize: 24, marginTop: 10 }}>Web applications for sequential visualization of algorithms</span>
                            </div>
                            <span className="author">{"Author: Evgenii Fedorow"}</span>
                            <span className="author">{"eafedorow@yandex.ru"}</span>
                            <a className="author" href="https://www.flaticon.com/ru/free-icons/" title="Перейти к автору иконок"> Автор иконок - phatplus</a>                        </div>
                    </animated.div>
                )}
            </Spring>
        </div>
    );
};

export default AboutPage;