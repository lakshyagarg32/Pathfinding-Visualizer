import React from "react";

let cost=0;
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
    return neighbours.filter(neighbour => !neighbour.isVisited && !neighbour.isWall);
}

function updateUnvisitedNeighbours(node,grid){
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

async function animateDijkstra(visitedNodesInOrder,nodesInShortestPathOrder){
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

async function visualizeDijkstra(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost){
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = dijkstras(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);
    setDesc1("Dijkstra's Algorithm is weighted and guarantees the shortest path !");
    if(nodesInShortestPathOrder.length!=0){
        setCost(cost-1);
    }
    else{
        setCost("No path exists between the two nodes")
    }
    cost=0;
    await animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
}

export default visualizeDijkstra;