import React from 'react';
import Header from "../components/Header/Header";
import {animated, Spring} from "react-spring";
import SortingChart from "../components/SortingChart/SortingChart";

const SortingPage = () => {
    return (
        <div >
            <Spring
                from={{opacity:0, transform: "translateX(-6rem)"}}
                to={{opacity:1, transform: "translateX(0rem)"}}
                config={{duration: 500}}
            >
                {props => (
                    <animated.div style={props}>
                        <div  className="page-info-wrapper">
                            <div  className="page-info">
                                <h1 className="page-title">Sorting algorithms</h1>
                                <hr/>
                                <span  style={{fontSize: 15, marginTop: 2 }}>Visualization of various sorting algorithms</span>
                                <hr/>
                            </div>
                        </div>
                        <div className="pageContainer">
                            <SortingChart/>
                        </div>
                    </animated.div>

                )}
            </Spring>
        </div>
    );
};

export default SortingPage;