import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import visualizeAStar from '../algorithms/Astar';
import visualizeDijkstra from '../algorithms/dijkstra';
import visualizeBFS from '../algorithms/BFS';
import visualizeDFS from '../algorithms/Dfs';
import "./appbar.css"
import { useState } from 'react';

function BasicExample(props) {
    const {grid,clearAlgo,resetBoard,startRow,startCol,finishRow,finishCol,setDesc1,setCost}=props;
    const [working,setWorking]=useState(false);
  return (
    <Navbar bg="light" expand="lg" className='appbar'>
      <Container>
        <Navbar.Brand className='heading'>Pathfinding Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown menuVariant="dark" title="Algorithms" id="basic-nav-dropdown" className='menu-title'>
              <NavDropdown.Item onClick={async()=>{
                if(!working){
                  setWorking(true);
                  clearAlgo(grid);
                  await visualizeDijkstra(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost);
                  setWorking(false);
                }
              }}>
              Dijkstra's Algorithm</NavDropdown.Item>
              <NavDropdown.Item onClick={async()=>{
                if(!working){
                  setWorking(true);
                  clearAlgo(grid);
                  await visualizeAStar(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost);
                  setWorking(false);
                }
              }}>
              A* Search</NavDropdown.Item>
              <NavDropdown.Item onClick={async()=>{
                if(!working){
                  setWorking(true);
                  clearAlgo(grid);
                  await visualizeBFS(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost);
                  setWorking(false);
                }
              }}>
              Breadth-First Search</NavDropdown.Item>
              <NavDropdown.Item onClick={async()=>{
                if(!working){
                  setWorking(true);
                  clearAlgo(grid);
                  await visualizeDFS(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost);
                  setWorking(false);
                }
              }}>
              Depth-First Search</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='button' onClick={()=>{
              if(!working){
                setDesc1(null);
                setCost(null);
                clearAlgo(grid);
              }
            }}>
            Clear Path</Nav.Link>
            <Nav.Link className='button' onClick={()=>{
                if(!working){
                setDesc1(null);
                setCost(null);
                resetBoard();
              }
            }}>Clear Board</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;