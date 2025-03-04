import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../subabase";

export default function Getraenk() {
    const [drink, setDrink] = useState({ id: null, bezeichnung: "", preis: 0 });
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const ID = id ? Number(id) : undefined;

    const ladeDaten = async () => {
        if (id) {
            try {
                const getr = await supabase.from('getraenke').select('*').eq('id', ID);
                setDrink(getr.data[0]);
            }
            catch(error) {
                console.error("Fehler beim Laden:", error);
            }
        }
    }

    const insertData = async () => {
        const { error } = await supabase
        .from('getraenke')
        .insert({'bezeichnung': drink.bezeichnung, 'preis': drink.preis});
        
        if (error) console.log(error);
    }
    
    const updateData = async () => {
        const { error } = await supabase
        .from('getraenke')
        .update(drink).eq('id', ID);
        
        if (error) console.log(error);
    }
    
    useEffect(() => {
        ladeDaten();
        setLoading(false);
    }, [id]);

    const handleChange = (e) => {
        if (e.target.id === "preis") {
            setDrink({ 
                ...drink, 
                preis: parseFloat(e.target.value) || 0 });
        } else setDrink({ ...drink, [e.target.id]: e.target.value });    
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (id) updateData();
        else insertData(); 
        navigate("/getraenke"); // Zurück zur Liste nach dem Speichern
    };
    if (loading) return(<p>Lade Daten...</p>);
    
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
            <div className="container mt-4">
                <h2 className="text-info bg-dark p-2 text-center">{id ? "Getränk aktualisieren" : "Neues Getränk hinzufügen"}</h2>
                <div className="mb-3">
                    <label htmlFor="bezeichnung" className="mb-1 bg-primary text-light w-100 p-2 rounded">
                        Bezeichnung:
                    </label>
                    <input
                        type="text"
                        id="bezeichnung"
                        name="bezeichnung"
                        value={drink.bezeichnung}
                        onChange={handleChange}
                        className="form-control border border-primary"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="preis" className="mb-1 bg-primary text-light w-100 p-2 rounded">
                        Preis (€):
                    </label>     
                    <input
                        type="number"
                        name="preis"
                        id="preis"
                        value={drink.preis}
                        onChange={handleChange}
                        className="form-control border border-primary"
                        required
                    />
                </div>
                <div className="container text-center">
                    <div className="row gx-1">
                        <div className="col">
                            <div className="p-1">
                                <button type="submit" className="w-100 rounded bg-primary text-light" disabled={loading}>
                                    {loading ? "Speichern..." : id ? "Speichern" : "Hinzufügen"}
                                </button>
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-1">
                                <button type="cancel" className="w-100 rounded bg-primary text-light" onClick={() => navigate("/getraenke")}>
                                    Abbrechen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
