import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";


const Navbarflight =()=>{
    return(
        <>
        <Navbar  className ="navbg" bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">FlightDreamers</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  as={Link} to="/">Booking</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <section className="sectionNvBar">
        <Outlet>

        </Outlet>
    </section>
           
        </>
    )
}

export default Navbarflight; 