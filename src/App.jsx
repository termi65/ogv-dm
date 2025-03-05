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
    
    async function addDrink({drink}) {
        try {
            await supabase.from('getraenke').insert({drink});
        } catch (error) {
            console.log("Fehler beim Einfügen Getränk:" + Error);
        }
        fetchDrinks();
    }
    async function deleteDrink(id) {
        try {
            await supabase.from("getraenke").delete().eq('id',id);
        } catch (error) {
            console.log("Fehler beim Löschen des Datensatzes!" + error);
        }
        fetchDrinks();
    }

    return (
        <div className="">
        <Navigation />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getraenke" element={<Getraenke drinks={drinks} 
                onEdit={(drink) => navigate(`/getraenk/${drink.id}`)} 
                onRefresh={fetchDrinks} 
                onDelete={(drinkId) => deleteDrink(drinkId)} 
                onAdd = {() => navigate(`/getraenk`)} />} 
                />
            <Route path="/getraenk/:id" element={<Getraenk onSave={() => { fetchDrinks(); navigate("/getraenke"); }} />} />
            <Route path="/mitglieder" element={<Mitglieder />} />
        </Routes>
        </div>
    );
}