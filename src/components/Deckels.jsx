import React from "react";

const Deckels = ({ deckelliste, onEdit, onRefresh, onDelete, onAdd }) => {
    return (
        <div className="container mt-4">
            <h2 className="text-info bg-dark p-2 text-center">Deckelliste <button type="button" className="btn btn-primary"  onClick={() => onAdd()}>+</button></h2>
            {deckelliste.map((dl) => (
                <h4>dl.mitglied</h4>
                
            ))};
        </div>
    )
}