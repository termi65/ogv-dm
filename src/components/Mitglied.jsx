import React, {useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../subabase";


// Ich muss Mitglieder.jsx mit dem refresh Parameter aufrufen, wenn sich hier was ändert!
// Nachschauen, ob man mit navigate auch einen Parameter mitgeben kann!
const Mitglied = ({onSave}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [mitglied, setMitglied] = useState({name:'', vorname:''});
    const ID = id ? Number(id) : 0;

    const ladeMitglied = async () => {
        try {
            if (id) {
                const mitg = await supabase.from('mitglieder').select('*').eq('id', ID);
                setMitglied(mitg.data[0]);
                
            } 
        }
        catch (error) {
            console.log(error);
        }
    }

    const insertMitglied = async () => {
        const { error } = await supabase
            .from('mitglieder')
            .insert({name:mitglied.name, vorname:mitglied.vorname});
        if (error) console.log(error);
    }
    
    const updateMitglied = async () => {
        const { error } = await supabase
            .from('mitglieder')
            .update(mitglied).eq('id', ID);

        if (error) console.log(error);
    }
     
    useEffect(() => {
        if (id) ladeMitglied();
        console.log(mitglied);
        }, []);

    // 3. Änderungen an den Server senden
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id) await insertMitglied();
        else await updateMitglied();
        onSave();
        };
    
    return (
        <div className="container mt-4">
        <h2 className="text-info bg-dark p-2 text-center">{id ? 'Mitglied bearbeiten' : 'Mitglied einfügen'}</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                    Name
                </label>
                <input type="text" required className="form-control border border-primary" id="name" value={mitglied.name} onChange={(e) => setMitglied({ ...mitglied, name: e.target.value })}/>
            </div>
            <div className="mb-3">
                <label htmlFor="vorname" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                    Vorname
                </label>
                <input type="text" required className="form-control border border-primary" id="vorname" value={mitglied.vorname} onChange={(e) => setMitglied({ ...mitglied, vorname: e.target.value })}/>
            </div>
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
                            <button type="cancel" className="w-100 rounded btn btn-primary" onClick={() => navigate("/mitglieder")}>
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

export default Mitglied;