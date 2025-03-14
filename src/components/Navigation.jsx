import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navigation() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const closeNav = () => {
        setIsNavCollapsed(true);
    };
    return (
        <div className="d-flex flex-column p-4 align-items-center bg-dark">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top navbar-on-top">
                <div className="container ">
                    <button className="navbar-toggler" 
                            type="button"
                            data-bs-toggle="collapse" 
                            data-bs-target="#togglerData" 
                            aria-controls="togglerData" 
                            aria-expanded={!isNavCollapsed ? true : false}
                            aria-label="Toggle navigation"
                            onClick={handleNavCollapse}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="togglerData">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item" key={1}>
                                <Link to="/" className="px-2 text-info" onClick={closeNav}><i className="bi bi-house-door"></i> Start</Link>
                            </li>
                            <li className="nav-item" key={2}>
                                <Link to="/getraenke" className="px-2 text-info" onClick={closeNav}><i className="bi bi-fuel-pump"></i> Getränke</Link>
                            </li>
                            <li className="nav-item pe-1" key={3}>
                                <Link to="/mitglieder" className="px-2 text-info" onClick={closeNav}><i className="bi bi-file-person"></i> Mitglieder</Link>
                            </li>
                            <li className="nav-item pe-1" key={4}>
                                <Link to="/verzehrliste" className="px-2 text-info" onClick={closeNav}><i className="bi bi-book"></i> Deckelmanager</Link>
                            </li>
                            <li className="nav-item pe-1" key={5}>
                                <Link to="/signup" className="px-2 text-info" onClick={closeNav}><i className="bi bi-fuel-pump"></i> Login/Registrieren</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}