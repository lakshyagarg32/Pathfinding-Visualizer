import React from "react";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

function getAllNodes(grid){
    const nodes=[];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}

function getHeuristic(){
    const heuristic=[];
    for(let row=0;row<20;row++){
        const currentRow=[];
        for(let col=0;col<50;col++){
            const curr=Math.abs(row-FINISH_NODE_ROW) + Math.abs(col-FINISH_NODE_COL);
            currentRow.push(curr);
        }
        heuristic.push(currentRow);
    }
    return heuristic;
}

function sortNodesbyDistance(unvisitednodes,heuristic){
    unvisitednodes.sort(function(a,b){
        const d1=a.distance+heuristic[a.row][a.col];
        const d2=b.distance+heuristic[b.row][b.col];
        return d1-d2;
    });
}

function getUnvisitedNeighbours(node,grid){
    const neighbours = [];
    const {col, row} = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours.filter(neighbour => !neighbour.isVisited && !neighbour.isWall);
}

function updateUnvisitedNeighbours(node,grid,heuristic){
    const unvisitedNeighbours=getUnvisitedNeighbours(node,grid);
    for(const neighbour of unvisitedNeighbours){
        var curr=1;
        if(neighbour.isWeight){
            curr=10;
        }
        if(neighbour.distance>node.distance+curr){
            neighbour.distance=node.distance+curr;
            neighbour.previousNode=node;
        }
    }
}

function astar(grid,startNode,finishNode){
    const heuristic=getHeuristic();
    startNode.distance=0;
    const visitedInOrder=[];
    const unvisitednodes=getAllNodes(grid);
    while(unvisitednodes.length){
        sortNodesbyDistance(unvisitednodes,heuristic);
        const currentNode=unvisitednodes.shift();
        if(currentNode.isWall){
            continue;
        }
        if(currentNode.distance===Infinity){
            return visitedInOrder;
        }
        currentNode.isVisited=true;
        visitedInOrder.push(currentNode);
        if(currentNode===finishNode){
            return visitedInOrder;
        }
        updateUnvisitedNeighbours(currentNode,grid,heuristic);
    }
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

function animateAStar(visitedNodesInOrder,nodesInShortestPathOrder){
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

function visualizeAStar(grid){
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);
    animateAStar(visitedNodesInOrder, nodesInShortestPathOrder);
}

export default visualizeAStar;