import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Getraenk from "./components/Getraenk";
import Getraenke from "./components/Getraenke";
import Mitglieder from "./components/Mitglieder";
import Mitglied from "./components/Mitglied";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Verzehrliste from "./components/Verzehrliste";

import supabase from "./subabase";
import Verzehr from "./components/Verzehr";
import SignUp from "./components/SignUp";
import Login from "./components/Login";


export default function App() {
    const navigate = useNavigate();
    const [getraenke, setGetraenke] = useState([]);
    const [mitglieder, setMitglieder] = useState([]);
    const [flatverzehr, setFlatverzehr] = useState([]);
    const [verzehr, setVerzehr] = useState([]);

    const ladeDaten = async () => {
        try {
            const [mitgliederRes, getraenkeRes, flatverzehrRes, verzehrRes] = await Promise.all(
                [
                    supabase.from('mitglieder').select('*').order('name', { ascending: true }),
                    supabase.from('getraenke').select('*').order('bezeichnung', { ascending: true }),
                    supabase.from('verzehr').select('*'),
                    supabase.from('verzehr').select(`
                        id, anzahl, mitglied_id,
                        mitglieder (id, name, vorname),
                        getraenke (id, bezeichnung, preis)`).order('bezeichnung', { referencedTable: 'getraenke',  ascending: true })
                ]);
            if (mitgliederRes.error || getraenkeRes.error || flatverzehrRes.error || verzehrRes.error) {
                throw new Error(`Fehler beim Laden der Getränke (getraenke / verzehr / flatverzehr / mitglieder) ${getraenkeRes.status} / ${verzehrRes.status} /${flatverzehrRes.status} / ${mitgliederRes.status} /  `);
            }
            setMitglieder(mitgliederRes.data);
            setGetraenke(getraenkeRes.data); 
            setFlatverzehr(flatverzehrRes.data); 
            setVerzehr(verzehrRes.data); 
        } catch(error) {
            console.error("Fehler beim Laden der Daten:", error);
        };
    }

    const deleteGetraenk = async (id) => {
        const index = flatverzehr.findIndex((f) => f.getraenke_id === id);
        if (index !== -1) {
            window.alert("Getränk wird im Verzehr verwendet und kann somit nicht gelöscht werden!");
            return;
        }

        if (window.confirm("Soll der Eintrag wirklich gelöscht werden?") === false) return;
        try {
            const { error } = await supabase.from('getraenke').delete().eq('id', id);
            if (error) {
                console.error("Fehler beim Löschen:", error);
                alert("Fehler beim Löschen des Getränks!");
            } 
        } catch (err) {
            console.error("Unerwarteter Fehler:", err);
            alert("Unerwarteter Fehler beim Löschen!");
        }
    }

    const deleteMitglied = async (id) => {
        try {
            const index = flatverzehr.findIndex((v) => v.mitglied_id === id);
            if (index !== -1) {
                window.alert("Mitglied kann nicht gelöscht werden, da es noch zu bezahlen hat.");
                return;
            }

            if (window.confirm("Soll der Eintrag wirklich gelöscht werden?") === false) return;

            const response = await supabase
                .from('mitglieder')
                .delete()
                .eq('id', id)
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
        ladeDaten();
    }
    
    // ---------- VERZEHR (Deckelmanagement) Bezahlen des Deckels 
    //  löscht alle Daten dieses Mitarbeiters in Tabelle Verzehr
    // -----------------
    const deleteVerzehr = async (mid) => {
        try {
            if (window.confirm("Achtung! Der Deckel wird jetzt weggeworfen und kann nicht wieder hergestellt werden. Trotzdem weiter?") === false) return;

            const response = await supabase
                .from('verzehr')
                .delete()
                .eq('mitglied_id', mid)
            console.log(response);
        }
        catch (error) {
            console.log(error);
        }
        ladeDaten();
    }

    useEffect(() => {
        ladeDaten();
    }, []);

    return (
        <div className="">
        <Navigation onRefresh={ladeDaten} />
        <Routes>
            <Route path="/" element={<Home />} />
            {/* -------------- Getränke -------------- */}
            <Route path="/getraenke" element={<Getraenke getraenke={getraenke} 
                onEdit={(drink) => navigate(`/getraenk/${drink.id}`)} 
                onRefresh={ladeDaten} 
                onDelete={(drinkId) => deleteGetraenk(drinkId)} 
                onAdd = {() => navigate(`/addgetraenk`)} />} 
            />
            <Route path="/getraenk/:id" element={<Getraenk onSave={() => { ladeDaten(); navigate("/getraenke"); }} />} />
            <Route path="/addgetraenk" element={<Getraenk onSave={() => { ladeDaten(); navigate("/getraenke");}} />} />
            
            {/* -------------- Mitglieder -------------- */}
            <Route path="/mitglieder" element={<Mitglieder mitglieder={mitglieder}
                onEdit={(mitglied) => navigate(`mitglied/${mitglied.id}`)}
                onRefresh={ladeDaten}
                onDelete={(mId) => deleteMitglied(mId)}
                onAdd={() => navigate(`/addmitglied`)}
                />} 
            />
            <Route path="/mitglied/:id" element={<Mitglied onSave={() => {ladeDaten(); navigate("/mitglieder");}} />} />
            <Route path="/addmitglied" element={<Mitglied onSave={() => {ladeDaten(); navigate("/mitglieder");}} />} />
            
            {/* -------------- Verzehr -------------- */}
            <Route path="/verzehrliste" element={<Verzehrliste 
                verzehrliste={verzehr} 
                mitglieder={mitglieder}
                getraenke={getraenke}
                onEdit={(verzehr) => navigate(`verzehr/${verzehr.id}`)}
                onRefresh={ladeDaten}
                onDelete={(mid) => deleteVerzehr(mid)}
                onAdd={() => navigate(`/addverzehr`)}
                />} 
            />
            <Route path="/verzehr/:id" element={<Verzehr 
                onSave={() => {ladeDaten(); navigate("/verzehrliste");}} 
                />}
            />
            <Route path="/addverzehr" element={<Verzehr 
                onSave={() => {ladeDaten(); navigate("/verzehrliste");}} />} />
            
            <Route path="/signup" element={<SignUp 
                onAnmelden={() => {ladeDaten(); navigate("/");}} />} />

            <Route path="/login" element={<Login 
                onAnmelden={() => {ladeDaten(); navigate("/");}} />} />

        </Routes>
        </div>
    );
}