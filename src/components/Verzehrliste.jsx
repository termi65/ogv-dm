import React, { useState } from "react";
import useScreenSize from "../utils/useScreenSize";
import supabase from "../subabase";
import Dialog from "./Dialog";

const Verzehrliste = ({ verzehrliste, mitglieder, getraenke, onEdit, onRefresh, onDelete, onAdd }) => {
    const screenSize = useScreenSize();
    const numberformat= new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const [showModal, setShowModal] = useState(false);

    const [currentMID, setCurrentMID] = useState(0);

    const berechneGesamtsummeMitglied = (mid) => {
        const filteredvl = verzehrliste.filter((item) => item.mitglied_id === mid);
        return filteredvl.reduce((sum, vl) => sum + vl.getraenke.preis * vl.anzahl, 0);
    }

    const gefilterteMitglieder = mitglieder.filter(mitglied =>
        verzehrliste.some(v => v.mitglied_id === mitglied.id)
      );

    const incGetraenk = async (id, anzahl) => {
        try {
            await supabase.from("verzehr").update({"anzahl": anzahl + 1}).eq("id", id);
            onRefresh();
        }
        catch (error) {
            alert("Fehler! " + error);
        }
    }

    const decGetraenk = async (id, anzahl) => {
        try {
            await supabase.from("verzehr").update({"anzahl": anzahl - 1}).eq("id", id);
            onRefresh();
        }
        catch (error) {
            alert("Fehler! " + error);
        }
    }

    const delGetraenk = async (verzehrId) => {
        try {
            await supabase.from("verzehr").delete().eq("id", verzehrId);
            onRefresh();
        }
        catch (error) {
            alert("Fehler! " + error);
        }
        
    }

    return (
        <div className="container mt-4">
            <h2 className="text-info bg-dark p-2 text-center">Deckelsammlung 
                <button type="button" className="ms-2 p-2 btn btn-primary" onClick={() => onAdd()}>
                    <i className="bi bi-cart-plus"></i>
                </button>
            </h2>
            <button className="btn btn-success btn-sm" onClick={onRefresh}>
                🔄 Aktualisieren
            </button>
            {gefilterteMitglieder.map((m) => (
                    <div key={m.id} className="mt-2">
                        <p className="">{m.name} {m.vorname}
                            <button className="ms-2 btn border-primary rounded" onClick={() => onEdit(m)}>+</button>
                        </p>
                        <div >
                            <table className="table table-bordered mt-2 border-primary p-1">
                                <thead>
                                    <tr>
                                        <th>Artikel</th>
                                        <th className="text-center">Anzahl</th>
                                        <th className="text-end">Preis</th>
                                        <th className="text-end">Gesamt</th>
                                        <th className="text-center">+1</th>
                                        <th className="text-center">-1</th>
                                        <th className="text-center">
                                            {(screenSize ==="sm" || screenSize ==="xs" ) ? 
                                                <i className="bi bi-x-square"></i> 
                                                : 
                                                <span>Löschen</span>}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {verzehrliste
                                        .filter((item) => item.mitglied_id === m.id)
                                        .map((eintrag) => {
                                            const getraenk = getraenke.find((g) => g.id === eintrag.getraenke.id);
                                            return (
                                                <tr key={eintrag.id} className="p-2 border-b">
                                                    <td>{getraenk.bezeichnung}</td> 
                                                    {eintrag.anzahl >= 0 ? 
                                                        <>
                                                            <td className="text-center">{eintrag.anzahl}</td>
                                                            <td className="text-end">{numberformat.format(getraenk.preis)}</td>
                                                            <td className="text-end">{numberformat.format(getraenk.preis * eintrag.anzahl)}</td>
                                                        </> 
                                                        : 
                                                        <>
                                                            <td className="text-center text-danger">{eintrag.anzahl}</td>
                                                            <td className="text-end text-danger">{numberformat.format(getraenk.preis)}</td>
                                                            <td className="text-end text-danger">{numberformat.format(getraenk.preis * eintrag.anzahl)}</td>
                                                        </>}
                                                    <td className="text-center">
                                                        <button className="btn btn-primary" onClick={(e) => {e.preventDefault(); incGetraenk(eintrag.id, eintrag.anzahl); }}>
                                                            +
                                                        </button>
                                                    </td>
                                                    <td className="text-center">
                                                        <button className="btn btn-primary"  onClick={(e) => {e.preventDefault(); decGetraenk(eintrag.id, eintrag.anzahl);}}>
                                                            -
                                                        </button>
                                                    </td>
                                                    <td className="text-center">
                                                        <button className="bg-danger text-light btn btn-primary"  
                                                            onClick={(e) => {if (window.confirm("Soll der Eintrag wirklich gelöscht werden?") === true) {e.preventDefault(); delGetraenk(eintrag.id);}}}>
                                                            {(screenSize ==="sm" || screenSize ==="xs" ) ? 
                                                             <i className="bi bi-x-square"></i> 
                                                             : <span>Löschen</span>}
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" className="text-right">Gesamt:</td>
                                        <td className={`text-end fw-bolder ${berechneGesamtsummeMitglied(m.id) >= 0 ? "text-dark" : "text-danger"}`}>{numberformat.format(berechneGesamtsummeMitglied(m.id))} €</td>
                                        <td colSpan="3"></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" className="text-end">
                                            <button className="btn btn-primary"
                                                onClick={() => {setCurrentMID(m.id); setShowModal(true)}}>
                                                Bezahlen
                                            </button>
                                        </td>
                                        <td colSpan="3"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>)
                )}
            <Dialog show={showModal}
                title='Achtung'
                text='Wollen Sie wirklich bezahlen? Der Deckel wird dann gelöscht!'
                nurOK={false}
                handleClose={() => setShowModal(false)}
                handleOK={() => {setShowModal(false); onDelete(currentMID)}}/>
        </div>
    );
}

export default Verzehrliste;