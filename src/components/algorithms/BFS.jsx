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

function animateShortestPath(nodesInShortestPathOrder){
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          const {row,col} = nodesInShortestPathOrder[i];
          document.getElementById(`node-${row}-${col}`).className ='node node-shortest-path';
        }, 50 * i);
    }
}

function animateBFS(visitedNodesInOrder,nodesInShortestPathOrder){
    for(let i=0;i<=visitedNodesInOrder.length;i++){
        if(i==visitedNodesInOrder.length){
            setTimeout(function(){
                animateShortestPath(nodesInShortestPathOrder);
            },10*i);
            return;
        }
        setTimeout(function(){
            const {row,col}=visitedNodesInOrder[i];
            document.getElementById(`node-${row}-${col}`).className="node node-visited";
        },10*i);
    }
}

function visulaizeBFS(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost){
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);
    animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
    setDesc1("Breadth-first Search is unweighted and guarantees the shortest path !");
    setCost(cost-1);
    cost=0;
}

export default visulaizeBFS;