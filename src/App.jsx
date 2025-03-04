import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Getraenk from "./components/Getraenk";
import Getraenke from "./components/Getraenke";
import Mitglieder from "./components/Mitglieder";
import Navigation from "./components/Navigation";
import Home from "./components/Home";

import supabase from "./subabase";

export default function App() {
  const [drinks, setDrinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrinks();
  }, []);

  async function fetchDrinks() {
    const { data, error } = await supabase.from("getraenke").select("*");
    if (!error) setDrinks(data);
  }

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getraenke" element={<Getraenke drinks={drinks} onEdit={(drink) => navigate(`/edit/${drink.id}`)} onRefresh={fetchDrinks} />} />
        <Route path="/edit/:id" element={<Getraenk onSave={() => { fetchDrinks(); navigate("/getraenke"); }} />} />
        <Route path="/mitglieder" element={<Mitglieder />} />
      </Routes>
    </div>
  );
}