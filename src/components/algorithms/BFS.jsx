import React from "react";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

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

function visulaizeBFS(grid){
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);
    animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
}

export default visulaizeBFS;