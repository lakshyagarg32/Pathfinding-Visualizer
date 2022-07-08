import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./appbar.css"

function BasicExample(props) {
    const {grid,clearAlgo,visualizeDijkstra,visualizeAStar,visualizeBFS,visualizeDFS,resetBoard}=props;
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
                visualizeDijkstra(grid);
              }}>
              Dijkstra's Algorithm</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeAStar(grid);
              }}>
              A* Search</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeBFS(grid);
              }}>
              Breadth-First Search</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                clearAlgo(grid);
                visualizeDFS(grid);
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