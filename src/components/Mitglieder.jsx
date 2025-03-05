const Mitglieder = ({ mitglieder, onEdit, onRefresh, onDelete, onAdd }) => {
    return (
        <div className="container mt-4">
            <h2 className="text-info bg-dark p-2 text-center">Mitgliederliste <button type="button" className="btn btn-primary"  onClick={() => onAdd()}>+</button></h2>
            <h2>Mitglieder</h2>
            <button className="btn btn-success btn-sm" onClick={onRefresh}>
                🔄 Aktualisieren
            </button>
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
                        <td><button type="button" className="btn bg-primary text-light" onClick={() => onEdit(m)}>Bearbeiten</button></td>
                        <td><button type="button" className="btn btn-primary" onClick={() => onDelete(m.id)}>Löschen</button></td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
  };

export default Mitglieder;