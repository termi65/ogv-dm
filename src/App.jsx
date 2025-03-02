import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Verzehr from "./components/Verzehr";
import Getraenke from "./components/Getraenke";
import Getraenk from "./components/Getraenk";
import Mitglieder from "./components/Mitglieder";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Mitglied from "./components/Mitglied";
// import AddMitglied from "./components/AddMitglied";
// import AddKundenVerzehr from "./components/AddKundenVerzehr";
// import AddVerzehr from "./components/AddVerzehr";

import './App.css'

function App() {
  return (
    <Router basename="/">
        <div>
            <Menu />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/verzehr" element={<Verzehr />} />
                    <Route path="/addverzehr" element={<AddVerzehr />} />
                    <Route path="/addKundenverzehr/:mitglied_id" element={<AddKundenVerzehr />} /> */}
                    <Route path="/updategetraenk/:id" element={<Getraenk />} />
                    <Route path="/addgetraenk" element={<Getraenk />} />
                    <Route path="/getraenke" element={<Getraenke/>} />
                    <Route path="/mitglieder" element={<Mitglieder />} />
                    <Route path="/mitglied/:id" element={<Mitglied />} />
                    <Route path="/addmitglied" element={<Mitglied />} />
                </Routes>
            </div>
        </div>
    </Router>
  )
}

export default App
