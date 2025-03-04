import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-around">
      <Link to="/" className="px-2">🏠 Start</Link>
      <Link to="/getraenke" className="px-2">🍹 Getränke</Link>
      <Link to="/customers" className="px-2">👥 Kunden</Link>
    </nav>
  );
}