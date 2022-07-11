import React,{useState,useEffect, useRef} from "react";
import "./App.css"
import Node from "./node/node";
import AppBar from "./appbar/appbar";
import InfoBox from "./infobox/infobox";

function App(){
    const [grid,setGrid]=useState([]);
    const [mouseIsPressed,setMouseIsPressed]=useState(false);
    const [keyIsPressed,setKeyIsPressed]=useState(false);
    const [startRow,setStartRow]=useState(0);
    const [startCol,setStartCol]=useState(0);
    const [finishRow,setFinishRow]=useState(0);
    const [finishCol,setFinishCol]=useState(5);
    const [startPress,setStartPress]=useState(false);
    const [finishPress,setFinishPress]=useState(false);
    const [desc1,setDesc1]=useState(null);
    const [cost,setCost]=useState(null);
    const ref=useRef(null);
    const [dimension, setDimension] = useState(null);
    const [columns,setColumns]=useState(null)
    const [windowHeight,setWindowHeight]=useState(null)
    const [rows,setRows]=useState(null);
    const [working,setWorking]=useState(false);

    useEffect(() => {
        function handleResize(){
            setWindowHeight(window.innerHeight)
        }
        window.addEventListener('resize', handleResize)
        handleResize();
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        function handleResize() {
          setDimension({
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight,
          });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);        
      }, []);

      useEffect(()=>{
        if(windowHeight && dimension){
            const r=Math.floor((windowHeight-dimension.height)/26);
            setRows(r);
            const c=Math.floor(dimension.width/26);
            setColumns(c);

            const r1=Math.floor(r/2);
            const c1=Math.floor(c/4);
            const c2=Math.floor(3*c/4);
            setStartRow(r1);
            setStartCol(c1);
            setFinishRow(r1);
            setFinishCol(c2);
        }
    },[windowHeight,dimension]);

    useEffect(function(){
        if(columns && rows){
            resetBoard();
        }
    },[columns,rows]);

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
            for(let row=0;row<rows;row++){
                const currentRow=[];
                for(let col=0;col<columns;col++){
                    currentRow.push(createNode(col,row));
                }
                temp.push(currentRow);
            }
            return temp;
    }

    function resetBoard(){
        const temp=getInitialGrid();
        setGrid(temp);
        for(let row=0;row<rows;row++){
            for(let col=0;col<columns;col++){
                const myele=document.getElementById(`node-${row}-${col}`);
                if(myele){
                    myele.className="node";
                }
            }
        }
    }

    function clearAlgo(grid){
        const temp=getInitialGrid();
        for(let row=0;row<rows;row++){
            for(let col=0;col<columns;col++){
                document.getElementById(`node-${row}-${col}`).className ='node';
                if(grid[row][col].isWall===true){
                    temp[row][col].isWall=true;
                }
                else if(grid[row][col].isWeight===true){
                    temp[row][col].isWeight=true;
                }
            }
        }
        setGrid(temp);
    }

    function handleKeyDown(event){
        if(working){
            return;
        }
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
            temp[row][col].isWall=true;
            temp[row][col].isWeight=false;
            return temp;
        })
        return;
    }

    function updateStart(row,col,prow,pcol){
        setStartRow(()=>{
            return row;
        })
        setStartCol(()=>{
            return col;
        })
        if(grid.length!==0){
            clearAlgo(grid);
        }
        setGrid((prev)=>{
            prev[prow][pcol].isStart=false;
            prev[row][col].isStart=true;
            prev[row][col].isWall=false;
            prev[row][col].isWeight=false;
            return prev;
        })
        return;
    }

    function updateFinish(row,col,prow,pcol){
        setFinishRow(()=>{
            return row;
        })
        setFinishCol(()=>{
            return col;
        })
        if(grid.length!==0){
            clearAlgo(grid);
        }
        setGrid((prev)=>{
            prev[prow][pcol].isFinish=false;
            prev[row][col].isFinish=true;
            prev[row][col].isWall=false;
            prev[row][col].isWeight=false;
            return prev;
        })
        return;
    }

    function handleMouseDown(row,col){
        if(working){
            return;
        }
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
        if(working){
            return;
        }
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
        <div ref={ref}>
        <AppBar 
            grid={grid}
            clearAlgo={clearAlgo}
            resetBoard={resetBoard}
            startRow={startRow}
            startCol={startCol}
            finishRow={finishRow}
            finishCol={finishCol}
            setDesc1={setDesc1}
            setCost={setCost}
            working={working}
            setWorking={setWorking}
        />
        <InfoBox />
        <div className="description">
        {desc1?<h5>{desc1}</h5>:<h5>Pick an Algorithm and visualize it</h5>}
        {cost && typeof(cost)=="number" ?<h5>Cost of the path is {cost}</h5>:cost===null?<h5>Drag mouse to draw walls, Hold W and hover to add weights</h5>:<h5>{cost}</h5>}
        </div>
        </div>
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