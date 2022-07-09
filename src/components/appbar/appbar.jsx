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
    const {grid,clearAlgo,resetBoard,startRow,startCol,finishRow,finishCol,setDesc1,setCost}=props;
  return (
    <Navbar bg="light" expand="lg" className='appbar'>
      <Container>
        <Navbar.Brand className='heading'>Pathfinding Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown menuVariant="dark" title="Algorithms" id="basic-nav-dropdown" className='menu-title'>
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeDijkstra(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost);
              }}>
              Dijkstra's Algorithm</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeAStar(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost);
              }}>
              A* Search</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeBFS(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost);
              }}>
              Breadth-First Search</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeDFS(grid,startRow,startCol,finishRow,finishCol,setDesc1,setCost);
              }}>
              Depth-First Search</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='button' onClick={()=>{
                setDesc1(null);
                setCost(null);
                clearAlgo(grid);
            }}>
            Clear Path</Nav.Link>
            <Nav.Link className='button' onClick={()=>{
                setDesc1(null);
                setCost(null);
                resetBoard();
            }}>Clear Board</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;