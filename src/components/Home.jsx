import React from "react";
import {Link} from "react-router-dom";

const Home = () => {

  return (
    <div className="p-4 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold">Willkommen zur Getränke-App</h1>
        <p className="mt-4">Verwalte deine Getränke und Kunden einfach und schnell.</p>
        <div className="mt-6 space-y-4">
            <Link to="/getraenke" className="block bg-blue-500 text-white px-4 py-2 rounded">🍹 Zur Getränkeliste</Link>
            <Link to="/mitglieder" className="block bg-green-500 text-white px-4 py-2 rounded">👥 Zur Kundenliste</Link>
        </div>
    </div>
  );
}

export default Home;