import React from "react";

var check=0;
let cost=0;

function DFShelper(grid,visitedInOrder,currentNode,finishNode){
    currentNode.isVisited=true;
    visitedInOrder.push(currentNode);
    if(currentNode===finishNode){
        check=1;
        return visitedInOrder;
    }
    const {row,col}=currentNode;
    if(row>0 && !grid[row-1][col].isVisited && !grid[row-1][col].isWall){
        grid[row-1][col].isVisited=true;
        grid[row-1][col].previousNode=currentNode;
        DFShelper(grid,visitedInOrder,grid[row-1][col],finishNode);
    }
    if(check===1){
        return visitedInOrder;
    }
    if(col+1<grid[0].length && !grid[row][col+1].isVisited && !grid[row][col+1].isWall){
        grid[row][col+1].isVisited=true;
        grid[row][col+1].previousNode=currentNode;
        DFShelper(grid,visitedInOrder,grid[row][col+1],finishNode);
    }
    if(check===1){
        return visitedInOrder;
    }
    if(row+1<grid.length && !grid[row+1][col].isVisited && !grid[row+1][col].isWall){
        grid[row+1][col].isVisited=true;
        grid[row+1][col].previousNode=currentNode;
        DFShelper(grid,visitedInOrder,grid[row+1][col],finishNode);
    }
    if(check===1){
        return visitedInOrder;
    }
    if(col>0 && !grid[row][col-1].isVisited && !grid[row][col-1].isWall){
        grid[row][col-1].isVisited=true;
        grid[row][col-1].previousNode=currentNode;
        DFShelper(grid,visitedInOrder,grid[row][col-1],finishNode);
    }
    return visitedInOrder;
}

function DFS(grid,startNode,finishNode){
    const visitedInOrder=[];
    return DFShelper(grid,visitedInOrder,startNode,finishNode);
}

function shortestPath(finishNode){
    const nodesInShortestPathOrder=[];
    let currentnode=finishNode;
    if(currentnode.previousNode===null){
        return nodesInShortestPathOrder;
    }
    while(currentnode!=null){
        if(currentnode.isWeight){
            cost+=10;
        }
        else{
            cost+=1;
        }
        nodesInShortestPathOrder.unshift(currentnode);
        currentnode=currentnode.previousNode;
    }
    return nodesInShortestPathOrder;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateShortestPath(nodesInShortestPathOrder){
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        await delay(50);
        const {row,col} = nodesInShortestPathOrder[i];
        document.getElementById(`node-${row}-${col}`).className ='node node-shortest-path';
    }
}

async function animateDFS(visitedNodesInOrder,nodesInShortestPathOrder){
    for(let i=0;i<=visitedNodesInOrder.length;i++){
        if(i==visitedNodesInOrder.length){
            await delay(10*i);
            await animateShortestPath(nodesInShortestPathOrder);
            return;
        }
        setTimeout(function(){
            const {row,col}=visitedNodesInOrder[i];
            document.getElementById(`node-${row}-${col}`).className="node node-visited";
        },10*i);
    }
}

async function visulaizeDFS(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost){
    check=0;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = DFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);
    setDesc1("Depth-first Search is unweighted and does not guarantees the shortest path !");
    if(nodesInShortestPathOrder.length!=0){
        setCost(cost-1);
    }
    else{
        setCost("No path exists between the two nodes")
    }
    cost=0;
    await animateDFS(visitedNodesInOrder, nodesInShortestPathOrder);
}

export default visulaizeDFS;