import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../subabase";

export default function Getraenk({onSave}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ bezeichnung: "", preis: "" });
    const [preis, setPreis] = useState("");

    const numberformat= new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    useEffect(() => {
        if (id) fetchDrink();
    }, []);

    async function fetchDrink() {
        const { data, error } = await supabase.from("getraenke").select("*").eq("id", id).single();
        if (!error) {
            setFormData(data);
            setPreis(numberformat.format(data.preis));
        }
    }

    const handleChange = (event) => {
        let input = event.target.value;
    
        // Erlaubt nur Zahlen, Komma oder Punkt (aber keine Buchstaben)
        if (!/^[0-9.,]*$/.test(input)) return;
    
        // Ersetze Komma durch Punkt für interne Verarbeitung
        setPreis(input);
      };
    
    async function handleSubmit(e) {
        e.preventDefault();
        let number = parseFloat(preis.replace(",", "."));
        let error;
        if (id) {
            error = await supabase
            .from("getraenke")
            .update({ bezeichnung: formData.bezeichnung, preis: number })
            .eq("id", id);
            }
        else {
            error = await supabase
            .from("getraenke")
            .insert({ bezeichnung: formData.bezeichnung, preis: number });
        }
        if (!error.error) {
            onSave();
        }
    }

    return (
    <div className="container mt-4">
        <h2 className="text-info bg-dark p-2 text-center">{id ? 'Getränk bearbeiten' : 'Getränk einfügen'}</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="bezeichnung" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                    Bezeichnung:
                </label>
                <input
                    type="text"
                    required
                    id="bezeichnung"
                    value={formData.bezeichnung}
                    onChange={(e) => setFormData({ ...formData, bezeichnung: e.target.value })}
                    className="form-control border border-primary"
                    />
            </div>
            <div className="mb-3">
                <label htmlFor="preis" className="mb-1 w-100 p-1 bg-primary text-light rounded">Preis</label>
                <input
                    required
                    type="text"
                    id="preis"
                    value={preis}
                    onChange={handleChange}
                    className="form-control border border-primary"
                />
            </div>
            <div className="row gx-1">
                <div className="col">
                    <div className="p-1">
                        <button className="w-100 rounded btn btn-primary">
                            Speichern
                        </button>
                    </div>
                </div>
                <div className="col">
                    <div className="p-1">
                        <button type="cancel" onClick={() => navigate("/getraenke")} className="w-100 rounded btn btn-primary">
                            Abbrechen
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    );
}
