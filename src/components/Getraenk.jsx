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
    <div className="">
      <h2 className="">{id ? 'Getränk bearbeiten' : 'Einfügen'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
            <label htmlFor="bezeichnung">Bezeichnung:</label>
            <input
                type="text"
                id="bezeichnung"
                value={formData.bezeichnung}
                onChange={(e) => setFormData({ ...formData, bezeichnung: e.target.value })}
                className="border p-1 w-full"
            />
        </div>
        <input
          type="number"
          value={formData.preis}
          onChange={(e) => setFormData({ ...formData, preis: e.target.value })}
          className="border p-1 w-full mt-2"
        />
        <div className="flex justify-end mt-4">
          <button type="button" onClick={() => navigate("/getraenke")} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
            Abbrechen
          </button>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Speichern
          </button>
        </div>
      </form>
    </div>
  );
}
