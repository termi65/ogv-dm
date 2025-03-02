import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import supabase from '../subabase';

const Mitglieder = () => {
    const [mitglieder, setMitglieder] = useState([]);
    const [verzehr, setVerzehr] = useState([]);

    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const deleteMitglied = async (id) => {
        try {
            const index = verzehr.findIndex((v) => v.mitglied_id === id);
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

    const ladeDaten = async () => {
        const getData = async () => {
            try {
                const [mitgliederRes, verzehrRes] = await Promise.all([
                    supabase.from('mitglieder').select('*'),
                    supabase.from('verzehr').select('*')
                ]);
                if (mitgliederRes.error || verzehrRes.error) {
                    throw new Error("Fehler beim Lesen Mitglieder/Verzehr:" + mitgliederRes.error + "," + verzehrRes.error);
                }
                setMitglieder(mitgliederRes.data);
                setVerzehr(verzehrRes.data);
            }
            catch(error) {
                console.log(error);
            }
        }
        getData();
    };

    useEffect(() => {
        ladeDaten();
        setLoading(false);
    }, [location.key]);
    
     if (loading) return (<p>Lade Daten ...</p>);
    return (
        <div className="container mt-4">
            <h2 className="text-info bg-dark p-2 text-center">Mitgliederliste <Link className='Link' to={`/addmitglied`}><button type="button" className="btn btn-primary">+</button></Link></h2>
            <h2>Mitglieder</h2>
            <table className="table table-bordered mt-2 border-primary p-1">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Vorname</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {mitglieder.map((m) => (
                    <tr key={m.id}>
                        <td>{m.name}</td>
                        <td>{m.vorname}</td>
                        <td><Link className='Link' to={`/mitglied/${m.id}`}><button type="button" className="btn bg-primary text-light">Bearbeiten</button></Link></td>
                        <td><button type="button" className="btn btn-primary" onClick={() => deleteMitglied(m.id)}>Löschen</button></td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
  };

export default Mitglieder;