import React from "react";

let cost=0;
function BFS(grid,startNode,finishNode){
    const visitedInOrder=[];
    const queue=[];
    queue.push(startNode);
    while(queue.length){
        const currentNode=queue.shift();
        visitedInOrder.push(currentNode);
        currentNode.isVisited=true;
        const {col, row} = currentNode;
        if(currentNode===finishNode){
            return visitedInOrder;
        }
        if(row>0 && !grid[row-1][col].isVisited && !grid[row-1][col].isWall){
            queue.push(grid[row-1][col]);
            grid[row-1][col].isVisited=true;
            grid[row-1][col].previousNode=currentNode;
        }
        if(col+1<grid[0].length && !grid[row][col+1].isVisited && !grid[row][col+1].isWall){
            queue.push(grid[row][col+1]);
            grid[row][col+1].isVisited=true;
            grid[row][col+1].previousNode=currentNode;
        }
        if(row+1<grid.length && !grid[row+1][col].isVisited && !grid[row+1][col].isWall){
            queue.push(grid[row+1][col]);
            grid[row+1][col].isVisited=true;
            grid[row+1][col].previousNode=currentNode;
        }
        if(col>0 && !grid[row][col-1].isVisited && !grid[row][col-1].isWall){
            queue.push(grid[row][col-1]);
            grid[row][col-1].isVisited=true;
            grid[row][col-1].previousNode=currentNode;
        }
    }
    return visitedInOrder;
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

async function animateBFS(visitedNodesInOrder,nodesInShortestPathOrder){
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

async function visulaizeBFS(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost){
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);
    setDesc1("Breadth-first Search is unweighted and guarantees the shortest path !");
    if(nodesInShortestPathOrder.length!=0){
        setCost(cost-1);
    }
    else{
        setCost("No path exists between the two nodes")
    }
    cost=0;
    await animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
}

export default visulaizeBFS;