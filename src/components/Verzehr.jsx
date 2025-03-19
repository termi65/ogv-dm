import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../subabase";

const Verzehr = ({onSave}) => {
    const {id} = useParams();
    const [mitglied, setMitglied] = useState({name:'', vorname:''});
    const [mitglieder, setMitglieder] = useState([]);
    const [selectedMitglied, setSelectedMitglied] = useState({id: 0, name:'', vorname:''});
    
    const [availableGetraenke, setAvailableGetraenke] = useState([]);
    const [selectedGetraenk, setSelectedGetraenk] = useState([]);
    const [currVerzehrliste, setCurrVerzehrliste] = useState([]);

    const navigate = useNavigate();
    const numberformat= new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const setValuesWithId = async () => {

            try {
                const [mitgliedRes, flatverzehrRes] = await Promise.all(
                    [
                        supabase.from('mitglieder').select('*').eq('id', id).single(),
                        supabase.from('verzehr').select('getraenk_id').eq('mitglied_id', id),
                    ]);
                if (mitgliedRes.error || flatverzehrRes.error ) {
                    throw new Error(`Fehler beim Laden der Getränke (mitglieder / verzehr ) ${mitgliedRes.status} / ${flatverzehrRes.status}`);
                }
                
                setMitglied(mitgliedRes.data);
                const konsumierteIds = flatverzehrRes.data.map(row => row.getraenk_id);
                const {data, error:error1} = await supabase.from('getraenke').select('*').not('id', 'in', `(${konsumierteIds})`);
                if (error1) console.log(error1);
                setAvailableGetraenke(data); 
            } catch(error) {
                console.error("Fehler beim Laden der Daten:", error);
            };
        }

        const setValues = async () => {
            try {
                const [getraenkeRes, flatverzehrRes] = await Promise.all(
                    [
                        supabase.from('getraenke').select('*'),
                        supabase.from('verzehr').select('mitglied_id'),
                    ]);
                if (getraenkeRes.error || flatverzehrRes.error ) {
                    throw new Error(`Fehler beim Laden der Getränke (getraenke / flatverzehr) ${getraenkeRes.status} / ${flatverzehrRes.status}`);
                }
                const bereitsAngelegteMitglieder = flatverzehrRes.data.map(row => row.mitglied_id);
                const {data, error:error1} = await supabase.from('mitglieder').select('*').not('id', 'in', `(${bereitsAngelegteMitglieder})`);
                if (error1) console.log(error1);
                setMitglieder(data);
                setCurrVerzehrliste(flatverzehrRes.data); 
                setAvailableGetraenke(getraenkeRes.data); 

            } catch(error) {
                console.error("Fehler beim Laden der Daten:", error);
            };
        }

    useEffect(() => {
        if (id) setValuesWithId();
        else setValues();
        
    }, []);

    // Beim Verzehr wird nur hinzugefügt (ein komplett neuer Deckel oder auf dem Deckel ein neues Getränk!).
    const insertVerzehr = async () => {
        if (id) {
            const {error} = await supabase.from("verzehr").insert({mitglied_id:id, getraenk_id: selectedGetraenk, anzahl:1});
            if (error) console.log(error);
        } else {
            const {error} = await supabase.from("verzehr").insert({mitglied_id: selectedMitglied, getraenk_id: selectedGetraenk, anzahl:1});
            if (error) console.log(error);
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await insertVerzehr();
        onSave();
        };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {id ? <h3>Edit {mitglied.name}</h3> : <h3>Neuer Deckel</h3>}
                {id ? 
                    <div>
                        <p><select
                                className="form-select bg-secondary"
                                value={selectedGetraenk}
                                onChange={(e) => setSelectedGetraenk(e.target.value)}
                            >
                                <option value="">Getränk auswählen</option>
                                {availableGetraenke.map((g) => (
                                    <option className="bg-info" key={g.id} value={g.id}>
                                        {g.bezeichnung} {numberformat.format(g.preis)} €
                                    </option>
                                ))}
                            </select>
                        </p>
                    </div>
                    :
                    <div>
                        <p><select
                                className="form-select bg-secondary"
                                value={selectedMitglied}
                                onChange={(e) => setSelectedMitglied(e.target.value)}
                            >
                                <option value="">Mitglied auswählen</option>
                                {mitglieder.map((m) => (
                                    <option className="bg-info" key={m.id} value={m.id}>
                                        {m.name} {m.vorname}
                                    </option>
                                ))}
                            </select>
                        </p>
                        <p><select
                                className="form-select bg-secondary"
                                value={selectedGetraenk}
                                onChange={(e) => setSelectedGetraenk(e.target.value)}
                            >
                                <option value="">Getränk auswählen</option>
                                {availableGetraenke.map((g) => (
                                    <option className="bg-info" key={g.id} value={g.id}>
                                        {g.bezeichnung} {numberformat.format(g.preis)} €
                                    </option>
                                ))}
                            </select>
                        </p>
                    </div>
                }
                <div className="container text-center">
                    <div className="row gx-1">
                        <div className="col">
                            <div className="p-1">
                                <button type="submit" className="w-100 rounded btn btn-primary">
                                    Speichern
                                </button>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-1">
                                <button type="cancel" className="w-100 rounded bg-primary text-light" onClick={() => navigate("/verzehrliste")}>
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Verzehr;