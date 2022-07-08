import React,{useState,useEffect} from "react";
import "./App.css"
import Node from "./node/node";
import visualizeDijkstra from "./algorithms/dijkstra";
import visualizeBFS from "./algorithms/BFS";
import visualizeDFS from "./algorithms/Dfs";
import visualizeAStar from "./algorithms/Astar";
import AppBar from "./appbar/appbar";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

function createNode(col,row){
    const node={
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
        isWeight:false,
    };
    return node;
}

function getInitialGrid(){
    const temp=[];
    for(let row=0;row<20;row++){
        const currentRow=[];
        for(let col=0;col<50;col++){
            currentRow.push(createNode(col,row));
        }
        temp.push(currentRow);
    }
    return temp;
}

function App(){
    const [grid,setGrid]=useState([]);
    const [mouseIsPressed,setMouseIsPressed]=useState(false);
    const [keyIsPressed,setKeyIsPressed]=useState(false);

    useEffect(function(){
        const temp=getInitialGrid();
        setGrid(temp);
    },[])

    function resetBoard(){
        const temp=getInitialGrid();
        setGrid(temp);
        for(let row=0;row<20;row++){
            for(let col=0;col<50;col++){
                document.getElementById(`node-${row}-${col}`).className ='node';
                if(row===START_NODE_ROW && col===START_NODE_COL){
                    document.getElementById(`node-${row}-${col}`).className ='node node-start';
                }
                else if(row===FINISH_NODE_ROW && col===FINISH_NODE_COL){
                    document.getElementById(`node-${row}-${col}`).className ='node node-finish';
                }
            }
        }
    }

    function clearAlgo(grid){
        const temp=getInitialGrid();
        for(let row=0;row<20;row++){
            for(let col=0;col<50;col++){
                if(row===START_NODE_ROW && col===START_NODE_COL){
                    document.getElementById(`node-${row}-${col}`).className ='node';
                }
                else if(row===FINISH_NODE_ROW && col===FINISH_NODE_COL){
                    document.getElementById(`node-${row}-${col}`).className ='node';
                }
                else if(grid[row][col].isWall===true){
                    temp[row][col].isWall=true;
                    document.getElementById(`node-${row}-${col}`).className="node node-wall";
                }
                else if(grid[row][col].isWeight===true){
                    temp[row][col].isWeight=true;
                    document.getElementById(`node-${row}-${col}`).className="node";
                }
                else{
                    document.getElementById(`node-${row}-${col}`).className ='node';
                }
            }
        }
        setGrid(temp);
    }

    function getNewGridWeight(grid,row,col){
        const newGrid=grid.slice();
        const node=newGrid[row][col];
        const newNode={
            ...node,
            isWeight:true,
            isWall:false,
        }
        newGrid[row][col]=newNode;
        return newGrid;
    }

    function handleKeyDown(event){
        const {key}=event;
        if(key==='w'){
            setKeyIsPressed(true);
        }
    }

    function handleKeyUp(){
        setKeyIsPressed(false);
    }

    function getNewGridWall(grid,row,col){
        const newGrid=grid.slice();
        const node=newGrid[row][col];
        const newNode={
            ...node,
            isWall:true,
            isWeight:false,
        };
        newGrid[row][col]=newNode;
        return newGrid;
    }

    function handleMouseDown(row,col){
        if(row===START_NODE_ROW && col===START_NODE_COL){
            return;
        }
        if(row===FINISH_NODE_ROW && col===FINISH_NODE_COL){
            return;
        }
        if(keyIsPressed){
            setMouseIsPressed(true);
            return;
        }
        const newGrid=getNewGridWall(grid,row,col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    }

    function handleMouseEnter(row,col){
        if(row===START_NODE_ROW && col===START_NODE_COL){
            return;
        }
        if(row===FINISH_NODE_ROW && col===FINISH_NODE_COL){
            return;
        }
        if(keyIsPressed){
            const newGrid=getNewGridWeight(grid,row,col);
            setGrid(newGrid);
            return;
        }
        if(!mouseIsPressed){
            return;
        }
        const newGrid=getNewGridWall(grid,row,col);
        setGrid(newGrid);
    }

    function handleMouseUp(){
        setMouseIsPressed(false);
    }

    return (
        <>
        <AppBar 
            grid={grid}
            clearAlgo={clearAlgo}
            visualizeDijkstra={visualizeDijkstra}
            visualizeAStar={visualizeAStar}
            visualizeBFS={visualizeBFS}
            visualizeDFS={visualizeDFS}
            resetBoard={resetBoard}
        />
        <div className="grid">
            {grid.map(function(row,rowidx){
                return (
                    <div className="row" key={rowidx}>
                        {row.map(function(node,nodeidx){
                            const {row,col,isFinish,isStart,isWall,isWeight}=node;
                            return (<Node 
                                key={nodeidx}
                                col={col}
                                row={row}
                                isStart={isStart}
                                isFinish={isFinish}
                                isWall={isWall}
                                isWeight={isWeight}
                                onKeyDown={(event)=>handleKeyDown(event)}
                                onKeyUp={()=>handleKeyUp()}
                                onMouseDown={(row,col) => handleMouseDown(row,col)}
                                onMouseEnter={(row,col) => handleMouseEnter(row,col)}
                                onMouseUp={()=>handleMouseUp()}
                            />)
                        })}
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default App;