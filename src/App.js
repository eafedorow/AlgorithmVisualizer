import React from 'react';
import './App.css';
import AboutPage from "./pages/AboutPage";
import SortingPage from "./pages/SortingPage";
import PathfindingPage from "./pages/PathfindingPage";
import {Routes, Route} from 'react-router-dom'
import Header from "./components/Header/Header";

const App = () => {
    return (
        <div className="app">
            <Header/>
            <Routes>
                <Route path="/" element={<AboutPage/>}/>
                <Route path="/sort" element={<SortingPage/>}/>
                <Route path="/pathfinding" element={<PathfindingPage/>}/>
                <Route path="*" element={<AboutPage/>}/>
            </Routes>
        </div>
    );
};

export default App;