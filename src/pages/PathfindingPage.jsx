import React from 'react';
import {animated, Spring} from "react-spring";
import Pathfind from "../components/Pathfind/Pathfind";

const PathfindingPage = () => {
    return (
        <div>
            <Spring
                from={{opacity:0, transform: "translateX(-6rem)"}}
                to={{opacity:1, transform: "translateX(0rem)"}}
                config={{duration: 500}}
            >
                {props => (
                    <animated.div style={props}>
                        <div className="page-info-wrapper">
                            <div  className="page-info">
                                <h1 className="page-title">Pathfinding algorithms</h1>
                                <hr/>
                                <span  style={{fontSize: 15, marginTop: 2 }}>Visualization of various algorithms for finding optimal shortest paths</span>
                                <hr/>

                            </div>
                        </div>
                        <Pathfind/>
                    </animated.div>
                )}
            </Spring>
        </div>
    );
};

export default PathfindingPage;