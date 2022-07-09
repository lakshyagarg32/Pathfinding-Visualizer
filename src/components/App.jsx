import React,{useState,useEffect} from "react";
import "./App.css"
import Node from "./node/node";
import AppBar from "./appbar/appbar";

function App(){
    const [grid,setGrid]=useState([]);
    const [mouseIsPressed,setMouseIsPressed]=useState(false);
    const [keyIsPressed,setKeyIsPressed]=useState(false);
    const [startRow,setStartRow]=useState(10);
    const [startCol,setStartCol]=useState(15);
    const [finishRow,setFinishRow]=useState(10);
    const [finishCol,setFinishCol]=useState(35);
    const [startPress,setStartPress]=useState(false);
    const [finishPress,setFinishPress]=useState(false);

    useEffect(function(){
        const temp=getInitialGrid();
        setGrid(temp);
    },[])

    useEffect(()=>{
        setGrid((prev)=>{
            const temp=[];
            for(let i=0;i<20;i++){
                const row=[];
                for(let j=0;j<50;j++){
                    const curr=prev[i][j];
                    if(i!=startRow || j!=startCol ){
                        curr.isStart=false;
                    }
                    row.push(curr);
                }
                temp.push(row);
            }
            return temp;
        })
    },[startRow])

    useEffect(()=>{
        setGrid((prev)=>{
            const temp=[];
            for(let i=0;i<20;i++){
                const row=[];
                for(let j=0;j<50;j++){
                    const curr=prev[i][j];
                    if(i!=finishRow || j!=finishCol ){
                        curr.isFinish=false;
                    }
                    row.push(curr);
                }
                temp.push(row);
            }
            return temp;
        })
    },[finishRow])

    function createNode(col,row){
        const node={
            col,
            row,
            isStart: row === startRow && col === startCol,
            isFinish: row === finishRow && col === finishCol,
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

    function resetBoard(){
        const temp=getInitialGrid();
        setGrid(temp);
        for(let row=0;row<20;row++){
            for(let col=0;col<50;col++){
                document.getElementById(`node-${row}-${col}`).className ='node';
                if(row===startRow && col===startCol){
                    document.getElementById(`node-${row}-${col}`).className ='node node-start';
                }
                else if(row===finishRow && col===finishCol){
                    document.getElementById(`node-${row}-${col}`).className ='node node-finish';
                }
            }
        }
    }

    function clearAlgo(grid){
        const temp=getInitialGrid();
        for(let row=0;row<20;row++){
            for(let col=0;col<50;col++){
                if(row===startRow && col===startCol){
                    document.getElementById(`node-${row}-${col}`).className ='node';
                }
                else if(row===finishRow && col===finishCol){
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

    function handleKeyDown(event){
        const {key}=event;
        if(key==='w'){
            setKeyIsPressed(true);
        }
    }

    function handleKeyUp(){
        setKeyIsPressed(false);
    }

    function updateWeight(row,col){
        setGrid((prev)=>{
            const temp=prev.slice();
            temp[row][col].isWeight=true;
            temp[row][col].isWall=false;
            return temp;
        })
        return;
    }

    function updateWall(row,col){
        setGrid((prev)=>{
            const temp=prev.slice();
            prev[row][col].isWall=true;
            prev[row][col].isWeight=false;
            return temp;
        })
        return;
    }

    function updateStart(row,col,prow,pcol){
        setGrid((prev)=>{
            prev[prow][pcol].isStart=false;
            prev[row][col].isStart=true;
            prev[row][col].isWall=false;
            prev[row][col].isWeight=false;
            return prev;
        })
        setStartRow(()=>{
            return row;
        })
        setStartCol(()=>{
            return col;
        })
        return;
    }

    function updateFinish(row,col,prow,pcol){
        setGrid((prev)=>{
            prev[prow][pcol].isFinish=false;
            prev[row][col].isFinish=true;
            prev[row][col].isWall=false;
            prev[row][col].isWeight=false;
            return prev;
        })
        setFinishRow(()=>{
            return row;
        })
        setFinishCol(()=>{
            return col;
        })
        return;
    }

    function handleMouseDown(row,col){
        if(row===startRow && col===startCol){
            setStartPress(true);
            return;
        }
        if(row===finishRow && col===finishCol){
            setFinishPress(true);
            return;
        }
        if(keyIsPressed){
            setMouseIsPressed(true);
            return;
        }
        updateWall(row,col);
        setMouseIsPressed(true);
    }

    function handleMouseEnter(row,col){
        if(row===startRow && col===startCol){
            return;
        }
        if(row===finishRow && col===finishCol){
            return;
        }
        if(startPress){
            updateStart(row,col,startRow,startCol);
            return;
        }
        if(finishPress){
            updateFinish(row,col,finishRow,finishCol);
            return;
        }
        if(keyIsPressed){
            updateWeight(row,col);
            return;
        }
        if(!mouseIsPressed){
            return;
        }
        updateWall(row,col);
        return;
    }

    function handleMouseUp(){
        setMouseIsPressed(false);
        setFinishPress(false);
        setStartPress(false);
        return;
    }

    return (
        <>
        <AppBar 
            grid={grid}
            clearAlgo={clearAlgo}
            resetBoard={resetBoard}
            startRow={startRow}
            startCol={startCol}
            finishRow={finishRow}
            finishCol={finishCol}
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