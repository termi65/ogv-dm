import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../subabase";

export default function Getraenk({onSave}) {
    const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ bezeichnung: "", preis: "" });

  useEffect(() => {
    if (id) fetchDrink();
  }, []);

  async function fetchDrink() {
    const { data, error } = await supabase.from("getraenke").select("*").eq("id", id).single();
    if (!error) setFormData(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let error;
    if (id) {
        error = await supabase
        .from("getraenke")
        .update({ bezeichnung: formData.bezeichnung, preis: formData.preis })
        .eq("id", id);
        }
    else {
        error = await supabase
        .from("getraenke")
        .insert({ bezeichnung: formData.bezeichnung, preis: formData.preis });
    }
    if (!error.error) {
      onSave();
    }
  }

  return (
    <div className="container mt-4">
        <h2 className="text-info bg-dark p-2 text-center">{id ? 'Getränk bearbeiten' : 'Einfügen'}</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="bezeichnung" className="mb-1 w-100 p-1 bg-primary text-light rounded">
                    Bezeichnung:
                </label>
                <input
                    type="text"
                    id="bezeichnung"
                    value={formData.bezeichnung}
                    onChange={(e) => setFormData({ ...formData, bezeichnung: e.target.value })}
                    className="form-control border border-primary"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="preis" className="mb-1 w-100 p-1 bg-primary text-light rounded">Preis</label>
                <input
                    type="number"
                    id="preis"
                    value={formData.preis}
                    onChange={(e) => setFormData({ ...formData, preis: e.target.value })}
                    className="form-control border border-primary"
                />
            </div>
            <div className="row gx-1">
                <div className="col">
                    <div className="p-1">
                        <button type="button" onClick={() => navigate("/getraenke")} className="w-100 rounded bg-primary text-light">
                            Abbrechen
                        </button>
                    </div>
                </div>
                <div className="col">
                    <div className="p-1">
                        <button type="submit" className="w-100 rounded bg-primary text-light">
                            Speichern
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}
