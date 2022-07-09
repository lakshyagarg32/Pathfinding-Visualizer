import React from "react";
import { FaAngleRight,FaBullseye,FaWeightHanging,FaB } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import "./node.css"

function node(props){
    const {row,col,isStart,isFinish,isWall,isWeight,onMouseDown,onMouseEnter,onMouseUp,onKeyDown,onKeyUp}=props;

    return (
        <div 
        tabIndex={0}
        id={`node-${row}-${col}`} 
        className="node"
        onKeyDown={(event)=>onKeyDown(event)}
        onKeyUp={()=>onKeyUp()}
        onMouseDown={() => onMouseDown(row,col)}
        onMouseEnter={() => onMouseEnter(row,col)}
        onMouseUp={()=>onMouseUp()}
        >
        {isStart?<FaAngleRight style={{fontSize:"25px"}} />:isFinish?<FaBullseye style={{fontSize:"25px"}} />:isWeight?<FaWeightHanging style={{fontSize:"25px"}} />:isWall?<GiBrickWall style={{fontSize:"25px"}} />:null}
        </div>
    )
}
export default node;