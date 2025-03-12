import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="d-flex flex-column p-4 align-items-center bg-dark">
        <nav className="">
            <Link to="/" className="px-2 text-info"><i className="bi bi-house-door"></i> Start</Link>
            <Link to="/getraenke" className="px-2 text-info"><i className="bi bi-fuel-pump"></i> Getränke</Link>
            <Link to="/mitglieder" className="px-2 text-info"><i className="bi bi-file-person"></i> Mitglieder</Link>
            <Link to="/verzehrliste" className="px-2 text-info"><i className="bi bi-book"></i> Deckelmanager</Link>
        </nav>
    </div>
  );
}