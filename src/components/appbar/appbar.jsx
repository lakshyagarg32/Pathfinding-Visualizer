import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import visualizeAStar from '../algorithms/Astar';
import visualizeDijkstra from '../algorithms/dijkstra';
import visualizeBFS from '../algorithms/BFS';
import visualizeDFS from '../algorithms/Dfs';
import "./appbar.css"

function BasicExample(props) {
    const {grid,clearAlgo,resetBoard,startRow,startCol,finishRow,finishCol}=props;
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Pathfinding Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeDijkstra(grid,startRow,startCol,finishRow,finishCol);
              }}>
              Dijkstra's Algorithm</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeAStar(grid,startRow,startCol,finishRow,finishCol);
              }}>
              A* Search</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeBFS(grid,startRow,startCol,finishRow,finishCol);
              }}>
              Breadth-First Search</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeDFS(grid,startRow,startCol,finishRow,finishCol);
              }}>
              Depth-First Search</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={()=>{
                clearAlgo(grid);
            }}>
            Clear Path</Nav.Link>
            <Nav.Link onClick={()=>{
                resetBoard();
            }}>Clear Board</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;