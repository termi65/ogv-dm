import React, {useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../subabase";


// Ich muss Mitglieder.jsx mit dem refresh Parameter aufrufen, wenn sich hier was ändert!
// Nachschauen, ob man mit navigate auch einen Parameter mitgeben kann!
const Mitglied = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const [mitglied, setMitglied] = useState({id:0, name:'', vorname:''});
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
        setLoading(false);
        }, [id]);

    const handleChange = (e) => {
        setMitglied({ ...mitglied, [e.target.id]: e.target.value });
        
        };
    
        // 3. Änderungen an den Server senden
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id) insertMitglied();
        else updateMitglied();
        navigate('/mitglieder');
        };
    
    if (loading) return <p>Lädt...</p>;

    return (
        <div className="container mt-4">
        <h2 className="text-info bg-dark p-2 text-center">Mitglied bearbeiten</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                    Name
                </label>
                <input type="text" className="form-control border border-primary" id="name" value={mitglied.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
            <label htmlFor="vorname" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                Vorname
            </label>
            <input type="text" className="form-control border border-primary" id="vorname" value={mitglied.vorname} onChange={handleChange} />
            </div>
            <div className="container text-center">
                <div className="row gx-1">
                    <div className="col">
                        <div className="p-1">
                            <button type="submit" className="w-100 rounded btn btn-primary" onClick={handleSubmit}>
                                Speichern
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="p-1">
                            <button type="cancel" className="w-100 rounded bg-primary text-light" onClick={() => navigate("/mitglieder")}>
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