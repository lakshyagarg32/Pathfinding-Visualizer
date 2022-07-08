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

function sortNodesbyDistance(unvisitednodes){
    unvisitednodes.sort(function(a,b){
        return a.distance-b.distance;
    });
}

function getUnvisitedNeighbours(node,grid){
    const neighbours = [];
    const {col, row} = node;
    if (row > 0) neighbours.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours.filter(neighbour => !neighbour.isVisited);
}

function updateUnvisitedNeighbours(node,grid){
    const unvisitedNeighbours=getUnvisitedNeighbours(node,grid);
    for(const neighbour of unvisitedNeighbours){
        if(neighbour.distance>node.distance+1){
            neighbour.distance=node.distance+1;
            neighbour.previousNode=node;
        }
    }
}

function dijkstras(grid,startNode,finishNode){
    const visitedInOrder=[];
    startNode.distance=0;
    const unvisitednodes=getAllNodes(grid);
    while(!!unvisitednodes.length){
        sortNodesbyDistance(unvisitednodes);
        const closestNode=unvisitednodes.shift();
        if(closestNode.isWall){
            continue;
        }
        if(closestNode.distance===Infinity){
            return visitedInOrder;
        }
        closestNode.isVisited=true;
        visitedInOrder.push(closestNode);
        if(closestNode===finishNode){
            return visitedInOrder;
        }
        updateUnvisitedNeighbours(closestNode,grid);
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

function animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder){
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

function visualizeDijkstra(grid){
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstras(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
}

export default visualizeDijkstra;