import React, {useState, useEffect} from 'react';
import Node from '../Node/Node'
import cl from './Pathfind.module.css'
import Astar from "../../PathfindingAlgorihms/ASTAR/Astar";
import {dijkstra, getNodesInShortestPathOrder} from '../../PathfindingAlgorihms/Dijkstra/Dijkstra'
import Button from "../UI/Button/Button";
import NodesStyles from '../Node/Node.module.css'
import InputRange from "../UI/InputRange/InputRange";

const COLS = 26;
const ROWS = 13;

const Pathfind = () => {
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [NODE_START_ROW, setNODE_START_ROW] = useState(Math.round(ROWS/2));
    const [NODE_START_COL, setNODE_START_COL] = useState(Math.round(COLS/2));;
    const [NODE_END_ROW, setNODE_END_ROW ] = useState(ROWS - 1);
    const [NODE_END_COL, setNODE_END_COL] = useState(COLS - 1);
    const [timeoutsArray, setTimeoutsArray] = useState([]);
    const [VisitedNodes, setVisitideNode] = useState([]);
    const [isPathfinding, setIsPathfinding] = useState(false);
    const [isNodeSetting, setIsNodeSetting] = useState(false);
    const [isStartEndChange, setIsStartEndChange] = useState(false);
    const [nodeSettingType, setNodeSettingType] = useState('');


    useEffect(() => {
        initilizeGrid();
    }, [])



    //CREATING THE GRID NODE_START_ROW, NODE_START_COL , NODE_END_ROW, NODE_END_COL
    const initilizeGrid = () => {
        const grid = new Array(ROWS)

        for (let i = 0; i < ROWS; i++) {
            grid[i] = new Array(COLS);
        }

        createSpot(grid)
        grid[NODE_START_ROW][NODE_START_COL].isWall = false;
        grid[NODE_END_ROW][NODE_END_COL].isWall = false;
        setGrid(grid);
        addNeighbours(grid);
        buildPath(grid, NODE_START_ROW, NODE_START_COL , NODE_END_ROW, NODE_END_COL)
    }



    function buildPath(
        grid,
        startX = NODE_START_ROW || 0,
        startY = NODE_START_COL || 0,
        endX = NODE_END_ROW,
        endY = NODE_END_COL
    ) {
        const startNode = grid[startX][startY];
        const endNode = grid[endX][endY];
        //
        // const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        // const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
        let {path, visitedNodes} = Astar(startNode, endNode);
        setPath(path);
        setVisitideNode(visitedNodes)
    }




    //CREATING THE SPOT
    const createSpot = (grid) => {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }
    }

    //ADD NEIGHBOURS
    const addNeighbours = (grid) => {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                grid[i][j].addNodeNeighbours(grid);
            }
        }
    }

    // SPOT CONSTRUCTOR
    function Spot(i, j) {
        this.x = i;
        this.y = j;
        this.isStart =  this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.distance = Infinity;
        this.weight = 0;
        this.isWeight = false;
        this.isVisited = false;
        this.neighbours = [];
        this.isWall = false;
        if(Math.random(1) < 0.2) {
            this.isWall = true;
        }
        this.previous = null;
        this.addNodeNeighbours = function(grid) {
            let i = this.x;
            let j = this.y;
            if(i > 0) this.neighbours.push(grid[i - 1][j]);
            if(i < ROWS - 1) this.neighbours.push(grid[i + 1][j]);
            if(j > 0) this.neighbours.push(grid[i][j - 1]);
            if(j < COLS - 1) this.neighbours.push(grid[i][j + 1]);
        };
    }


    // GRID WITH NODE
    const gridWidthNode = (
        <div>
            {Grid.map((row, rowIndex) => {
                return(
                    <div key={rowIndex} className={cl.rowWrapper}>
                        {row.map((col, colIndex) => {
                            const {isStart, isEnd, isWall} = col;
                            return <Node
                                key={colIndex}
                                isStart={isStart}
                                isEnd={isEnd}
                                row={rowIndex}
                                col={colIndex}
                                isWall={isWall}
                                onMouseEnter={() => mouseEnterHandle(nodeSettingType, rowIndex, colIndex)}
                                onMouseUp={() => {onMouseUp()}}
                                onMouseDown={() => {onMouseDown(nodeSettingType, rowIndex, colIndex)}}
                            />
                        })}
                    </div>
                )
            })}
        </div>
    )

    const visulaizeShortestPath = (shortestPathNodes) => {
        for (let i = 0; i < shortestPathNodes.length; i++) {
            const timeoutHandle = setTimeout(() => {
                const node = shortestPathNodes[i];
                if(!node.isStart && !node.isEnd) {
                    document.getElementById(`node-${node.x}-${node.y}`).className =
                        `${NodesStyles.node} ${NodesStyles.nodeShortestPath}`;
                }
            }, 20 * i)
            setTimeoutsArray([...timeoutsArray,timeoutHandle]);
        }
        const timeoutHandle = setTimeout(() => {
            setIsPathfinding(false);
        }, shortestPathNodes.length * 20 + 1)
    }

    const visualizePath = () => {
        clearGrid();
        setIsPathfinding(true);
        for (let i = 0; i <= VisitedNodes.length; i++) {
            if(i === VisitedNodes.length) {
                const timeoutHandle = setTimeout(() => {
                    visulaizeShortestPath(Path);
                }, 20 * i)
                setTimeoutsArray([...timeoutsArray,timeoutHandle]);
            } else {
                const timeoutHandle =  setTimeout(() => {
                    const node = VisitedNodes[i];
                    if(!node.isStart && !node.isEnd) {
                        document.getElementById(`node-${node.x}-${node.y}`).className =
                            `${NodesStyles.node} ${NodesStyles.visited}`;
                    }
                }   , 20 * i)
                setTimeoutsArray([...timeoutsArray,timeoutHandle]);
            }
        }
    }

    function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 1; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                   animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }

            if (i === visitedNodesInOrder.length - 1) continue;
            setTimeout(() => {
                const node = visitedNodesInOrder[i];

                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        `${NodesStyles.node} ${NodesStyles.visited}`;

            }, 10 * i);
        }
    }

    function animateShortestPath(nodesInShortestPathOrder) {
        console.log('shrort path')
        for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];

                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        `${NodesStyles.node} ${NodesStyles.nodeShortestPath}`;

            }, 50 * i);
        }
        console.log(nodesInShortestPathOrder)
    }

    function clearGrid() {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                const node = Grid[i][j];
                if(!node.isStart && !node.isEnd && !node.isWall) {
                    document.getElementById(`node-${node.x}-${node.y}`).className =`${NodesStyles.node}`;
                }
            }
        }
    }
    const visualizeGenerationGrid =  () => {
        clearGrid();
        initilizeGrid();
    }

    //NEED TO IMPROVE
    function stopVisualization() {
        timeoutsArray.map((el) => {
            clearTimeout(el);
        })
        setTimeoutsArray([]);
    }

    function setNode(nodeSettingType, x, y) {
        const grid = Grid;
        let newNode = grid[x][y];
        switch (nodeSettingType) {
            case "WALL":
                if (!newNode.isStart && !newNode.isEnd) {
                    newNode.isWall = newNode.isWall ? false : true;
                    grid[x][y] = newNode;
                    setGrid([...grid]);
                    buildPath(Grid);
                }
                break;
            case "START":
                if (!newNode.isStart && !newNode.isEnd) {
                    grid[NODE_START_ROW][NODE_START_COL].isStart = false;
                    newNode.isStart = true;
                    newNode.isWall = false;
                    grid[x][y] = newNode;
                    setGrid(grid);
                    setNODE_START_ROW(x);
                    setNODE_START_COL(y);
                    buildPath(grid, x, y, undefined, undefined);
                }
                break;
            case "END":
                if (!newNode.isStart && !newNode.isEnd) {
                    grid[NODE_END_ROW][NODE_END_COL].isEnd = false;
                    newNode.isEnd = true;
                    newNode.isWall = false;
                    grid[x][y] = newNode;
                    setGrid([...grid]);
                    setNODE_END_ROW(x);
                    setNODE_END_COL(y);
                    buildPath(grid, undefined,undefined, x, y);
                }
                break;
            default:
                break;
        }
    }

    function onMouseDown (nodeSettingType, x, y) {
        if(!isPathfinding) {
            clearGrid();
            setIsNodeSetting(true);
            setNode(nodeSettingType, x, y)
        }
    }

    function onMouseUp() {
        setIsNodeSetting(false);
    }

    function mouseEnterHandle(nodeSettingType, x, y) {
        if(isNodeSetting && nodeSettingType !== "START" && nodeSettingType !== "END") {
            setNode(nodeSettingType, x, y)
        }
    }

    return (
        <div onMouseUp={onMouseUp} className={cl.wrapper}>
            <div className={cl.grid}>
                {gridWidthNode}
            </div>

            <div className={cl.settingsMenu}>
                <h2 className={cl.title}>Pathfinding settings</h2>
                <span className={cl.title}>Manage the pathfinding process</span>
                <div className={cl.buttonsWrapper}>
                    <Button
                        disabled={isPathfinding}
                        onClick={ () => {
                            visualizePath();
                        }
                    }>
                        Visualize Path
                    </Button>
                    <Button
                        disabled={isPathfinding}
                        onClick={() => {
                            visualizeGenerationGrid()
                        }
                    }
                    >
                        Build new grid
                    </Button>
                    {/*<Button onClick={stopVisualization}>Stop</Button>*/}
                </div>

                <span className={cl.title}>Set the points</span>
                <div className={cl.buttonsWrapper}>
                    {/*<Button*/}
                    {/*    onClick={() => setNodeSettingType('START')}*/}
                    {/*    disabled={isPathfinding}*/}
                    {/*>*/}
                    {/*    Set start point*/}
                    {/*</Button>*/}
                    <Button
                        onClick={() => setNodeSettingType('END')}
                        disabled={isPathfinding}
                    >
                        Set target point
                    </Button>
                </div>
                <div style={{marginBottom:10}}>
                    <Button
                        disabled={isPathfinding}
                        onClick={() => setNodeSettingType('WALL')}
                    >
                        Set unwalkable point
                    </Button>
                </div>
                <span>{nodeSettingType ? `Setting ${nodeSettingType.toLowerCase()} node` : ""}</span>

            </div>
        </div>
    );
};


export default Pathfind;