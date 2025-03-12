import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../subabase";

const Verzehr = () => {
    const {id} = useParams();
    const [mitglied, setMitglied] = useState({name:'', vorname:''});
    const [currGetraenke, setCurrGetraenke] = useState([]);
    const [getraenke, setGetraenke] = useState([]);
    const [currVerzehrliste, setCurrVerzehrliste] = useState([]);

    const setValues = async () => {
            try {
                const [mitgliedRes, getraenkeRes, flatverzehrRes] = await Promise.all(
                    [
                        supabase.from('mitglieder').select('*').eq('id', id).single(),
                        supabase.from('getraenke').select('*'),
                        supabase.from('verzehr').select('*').eq('mitglied_id', id),
                    ]);
                if (mitgliedRes.error || getraenkeRes.error || flatverzehrRes.error ) {
                    throw new Error(`Fehler beim Laden der Getränke (getraenke / verzehr / flatverzehr / mitglieder) ${getraenkeRes.status} / ${flatverzehrRes.status} / ${mitgliedRes.status} /  `);
                }
                setMitglied(mitgliedRes.data);
                setCurrVerzehrliste(flatverzehrRes.data); 
                setGetraenke(getraenkeRes.data); 

                const filteredGetraenke = getraenkeRes.data.filter(getraenk => flatverzehrRes.data.some(v => v.getraenke_id === getraenk.id));
                setCurrGetraenke(filteredGetraenke);
            } catch(error) {
                console.error("Fehler beim Laden der Daten:", error);
            };
        }
        // let { data, error } = await supabase.from('verzehr').select('*').eq('mitglied_id', Number(id));
        // if (!error1) setCurrVerzehrliste(vz);

        // { mtgl, error2 } = await supabase.from("mitglieder").select("*").eq("id", vz[0].mitglied_id).single();
        // if (!error2)
        //     setMitglied(mtgl);

        // const { getr, error3 } = await supabase.from("getraenke").select("*");
        // if (error1 || error2 || error3) {
        //     alert("Fehler:" + error1  + "/" + error2 + "/" + error3);
        //     return;
        // }

        // const filteredGetraenke = getr.filter((getraenk) => !filteredVerzehr.some(v => v.getraenke_id === getraenk.id));
        // setCurrGetraenke(filteredGetraenke);
    // }
    
    useEffect(() => {
        setValues();
        console.log(currGetraenke);
    }, []);

    return(
        <div>
            {id ? <h3>Edit {mitglied.name}</h3> : <h3>Neuer Deckel</h3>}
            <div>
                <ul>{currGetraenke.map((m) => {
                    <li>m.bezeichnung, m.preis</li>
                })}
                </ul>
            </div>

        </div>
    );
}

export default Verzehr;