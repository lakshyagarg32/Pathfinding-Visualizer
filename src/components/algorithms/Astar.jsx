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

function getHeuristic(grid,finishNode){
    const heuristic=[];
    for(let row=0;row<grid.length;row++){
        const currentRow=[];
        for(let col=0;col<grid[0].length;col++){
            const curr=Math.abs(row-finishNode.row) + Math.abs(col-finishNode.col);
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
    const heuristic=getHeuristic(grid,finishNode);
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

async function animateAStar(visitedNodesInOrder,nodesInShortestPathOrder){
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

async function visualizeAStar(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost){
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);
    setDesc1("A* Search is weighted and guarantees the shortest path !");
    if(nodesInShortestPathOrder.length!=0){
        setCost(cost-1);
    }
    else{
        setCost("No path exists between the two nodes")
    }
    cost=0;
    await animateAStar(visitedNodesInOrder, nodesInShortestPathOrder);
}

export default visualizeAStar;