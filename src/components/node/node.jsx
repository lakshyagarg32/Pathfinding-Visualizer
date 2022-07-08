import React from "react";
import { FaAngleRight,FaBullseye,FaWeightHanging } from "react-icons/fa";
import "./node.css"

function node(props){
    const {row,col,isStart,isFinish,isWall,isWeight,onMouseDown,onMouseEnter,onMouseUp}=props;
    const extraClassName=isWall
    ?"node-wall"
    :"";

    return (
        <div 
        id={`node-${row}-${col}`} 
        className={"node "+extraClassName}
        onMouseDown={() => onMouseDown(row,col)}
        onMouseEnter={() => onMouseEnter(row,col)}
        onMouseUp={()=>onMouseUp()}
        >
        {isStart?<FaAngleRight style={{fontSize:"25px"}} />:isFinish?<FaBullseye style={{fontSize:"25px"}} />:isWeight?<FaWeightHanging style={{fontSize:"25px"}} />:null}
        </div>
    )
}
export default node;