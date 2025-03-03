import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Menu = () => {
    const [expanded, setExpanded] = useState(false);


    return (
        <Navbar id="navbar" title="Navigation bar"  expand="md" expanded={expanded} >
            <Container>
                <Navbar.Toggle aria-controls='basic-navbar-nav' 
                    onClick={() => setExpanded(expanded ? false : true)}/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link as={Link} className='Link text-primary text-decoration-underline' onClick={() => setExpanded(false)} to='/'>Home</Nav.Link>
                        {/* <Nav.Link as={Link} className='Link text-primary text-decoration-underline' onClick={() => setExpanded(false)} to='/Verzehr'>Verzehr</Nav.Link> */}
                        <Nav.Link as={Link} className='Link text-primary text-decoration-underline' onClick={() => setExpanded(false)} to='/Getraenke/false'>Getränke</Nav.Link>
                        <Nav.Link as={Link} className='Link text-primary text-decoration-underline' onClick={() => setExpanded(false)} to='/Mitglieder'>Mitglieder</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;