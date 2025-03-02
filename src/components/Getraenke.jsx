import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import supabase from "../subabase";

const Getraenke = () => {
    const [getraenke, setGetraenke] = useState([]);
    const [flatverzehr, setFlatverzehr] = useState([]);
    const [loading, setLoading] = useState(true);

    const numberformat = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    const ladeDaten = async () => {
        try {
            const [getraenkeRes, verzehrRes] = await Promise.all(
                [
                    supabase.from('getraenke').select('*'),
                    supabase.from('verzehr').select('*')
                ]);
            if (getraenkeRes.error || verzehrRes.error) {
                throw new Error(`Fehler beim Laden der Getränke (getraenke / verzehr) ${getraenkeRes.status} / ${verzehrRes.status} `);
            }
            setGetraenke(getraenkeRes.data); 
            setFlatverzehr(verzehrRes.data); 
        } catch(error) {
            console.error("Fehler beim Laden der Daten:", error);
        };
    }

    const deleteGetränk = async (id) => {
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
            } else {
                alert("Getränk erfolgreich gelöscht!");
                ladeDaten();
            }
        } catch (err) {
            console.error("Unerwarteter Fehler:", err);
            alert("Unerwarteter Fehler beim Löschen!");
        }
    }
          
    useEffect(() => {
        ladeDaten();
        setLoading(false);
    }, []);
  
    if (loading) return <p>Daten werden geladen...</p>;
  
    return (
      <div className="p-4">
        <h2 className="text-info bg-dark p-2 text-center">
            Getränkeliste 
            <Link className='Link' to={`/addgetraenk`}>
                <button type="button" className="btn btn-primary">
                    +
                </button>
            </Link>
        </h2>
        <table className="table table-bordered mt-2 border-primary p-1">
            <thead>
                <tr>
                    <th>Bezeichnung</th>
                    <th>Preis</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {getraenke.map((getraenk) => (
                    <tr key={getraenk.id}>
                        <td><strong>{getraenk.bezeichnung}</strong></td>
                        <td>{numberformat.format(getraenk.preis)} €</td>
                        <td>
                            <Link to={`/updategetraenk/${getraenk.id}`} className="ml-4 text-blue-500">
                                <button className="btn bg-primary text-light">Bearbeiten</button>
                            </Link>
                        </td>
                        <td className="text-center">
                            <button className="btn bg-primary text-light" onClick={() => deleteGetränk(getraenk.id)}>
                                Löschen
                            </button>
                        </td>
                    </tr>))}
            </tbody>
        </table>
      </div>
    );
  };

  export default Getraenke;