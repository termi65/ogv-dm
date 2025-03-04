import { useState, useEffect } from "react";
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
  
  async function deleteDrink(id) {
    const { data, error } = await supabase.from("getraenke").delete().eq('id',id);
    if (!error) fetchDrinks();
  }

  return (
    <div className="m-4 bg-secondary">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getraenke" element={<Getraenke drinks={drinks} 
            onEdit={(drink) => navigate(`/getraenk/${drink.id}`)} 
            onRefresh={fetchDrinks} 
            onDelete={(drinkId) => deleteDrink(drinkId)} />} 
            />
        <Route path="/getraenk/:id" element={<Getraenk onSave={() => { fetchDrinks(); navigate("/getraenke"); }} />} />
        <Route path="/mitglieder" element={<Mitglieder />} />
      </Routes>
    </div>
  );
}