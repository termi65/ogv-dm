import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import supabase from '../subabase';

const Mitglieder = () => {
    const [mitglieder, setMitglieder] = useState([]);
    // const [verzehr, setVerzehr] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    
    // const deleteMitglied = (id) => {
    //     const index = verzehr.findIndex((v) => v.mitglied_id === id);
    //     if (index !== -1) {
    //         window.alert("Mitglied kann nicht gelöscht werden, da es noch zu bezahlen hat.");
    //         return;
    //     }

    //     if (window.confirm("Soll der Eintrag wirklich gelöscht werden?") === false) return;
    //     fetch(`${globalURL}/delmitglied/${id}`, {
    //         method: "DELETE",
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log(data);
    //         ladeMitglieder();
    //     })
    //     .catch((error) => {
    //         console.error("Fehler beim Löschen:", error);
    //     });
    // }
    
    useEffect(() => {
        const getMitglieder = async () => {
            const { data, error } = await supabase.from('mitglieder').select('*');
            if (error) {
                console.error("Fehler beim Abrufen der Mitglieder:", error);
            } else {
                console.log(`Anzahl Mitglieder: ${data.length}`, data);
                setMitglieder(data);
            }
        };
    
        getMitglieder();
        setLoading(false);
    }, [location.key]);
    
    // const ladeMitglieder = async () => {
    //     try {
    //         const [mitgliederRes, verzehrRes] = await Promise.all([
    //             fetch(globalURL + "/mitglieder"),
    //             fetch(globalURL + "/flatverzehr")
    //         ]);
    
    //         if (!mitgliederRes.ok || !verzehrRes.ok) {
    //             throw new Error(`Fehler beim Laden: ${mitgliederRes.status} / ${verzehrRes.status}`);
    //         }
    
    //         const mitgliederData = await mitgliederRes.json();
    //         const verzehrData = await verzehrRes.json();
    
    //         setMitglieder(mitgliederData);
    //         setVerzehr(verzehrData);
    //     } catch (error) {
    //         console.error("Fehler beim Laden der Daten:", error);
    //         alert("Fehler beim Laden der Daten! Prüfe, ob der Server läuft.");
    //     }
    // };
        
    // useEffect(() => {
    //     ladeMitglieder();
    //     setLoading(false);
    // }, [location.key]);
  
    if (loading) return (<p>Lade Daten ...</p>);
    return (
        <div className="container mt-4">
            {/* <h2 className="text-info bg-dark p-2 text-center">Mitgliederliste <Link className='Link' to={`/addmitglied`}><button type="button" className="btn btn-primary">+</button></Link></h2> */}
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
                        {/* <td><Link className='Link' to={`/edit/${m.id}`}><button type="button" className="btn bg-primary text-light">Bearbeiten</button></Link></td> */}
                        {/* <td><button type="button" className="btn btn-primary" onClick={() => deleteMitglied(m.id)}>Löschen</button></td> */}

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
  };

export default Mitglieder;