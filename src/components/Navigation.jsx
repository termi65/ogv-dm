import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="d-flex flex-column  align-items-center bg-success">
        <nav className="">
            <Link to="/" className="px-2">🏠 Start</Link>
            <Link to="/getraenke" className="px-2">🍹 Getränke</Link>
            <Link to="/mitglieder" className="px-2">👥 Mitglieder</Link>
        </nav>
    </div>
  );
}