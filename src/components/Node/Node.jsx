import React from 'react';
import cl from './Node.module.css'


const Node = ({
                  isStart,
                  isEnd,
                  isWall,
                  onMouseDown,
                  onMouseEnter,
                  onMouseUp,
                  row,
                  col,
                  nodeSettingType
              }) => {

    const extraClass = isStart ? cl.nodeStart : isWall ? cl.nodeWall : isEnd ? cl.nodeEnd : cl.nodeRegular;
    return (
        <div
            onMouseDown={() => { onMouseDown(nodeSettingType, row, col) }}
            onMouseEnter={() => { onMouseEnter(nodeSettingType, row, col)}}
            onMouseUp={() => {    onMouseUp()   }}
            className={`${cl.node} 
            ${extraClass}`}
            id={`node-${row}-${col}`
        }>
            
        </div>
    );
};

export default Node;