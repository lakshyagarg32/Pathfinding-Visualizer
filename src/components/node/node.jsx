import React from "react";
import "./node.css"

function node(props){
    const {row,col,isStart,isFinish,isWall,onMouseDown,onMouseEnter}=props;
    const extraClassName=isFinish
    ?"node-finish"
    :isStart
    ?"node-start"
    :isWall
    ?"node-wall"
    :"";

    return (
        <div 
        id={`node-${row}-${col}`} 
        className={"node "+extraClassName}
        onMouseDown={() => onMouseDown(row,col)}
        onMouseEnter={() => onMouseEnter(row,col)}
        ></div>
    )
}
export default node;