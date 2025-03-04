const Getraenke = ({ drinks, onEdit, onRefresh, onDelete }) => {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold">Getränkeliste</h1>
        <button className="btn btn-success btn-sm" onClick={onRefresh}>
          🔄 Aktualisieren
        </button>
        <table className="table table-success table-striped">
            <thead>
                <tr>
                    <th>Bezeichnung</th>
                    <th>Preis (€)</th>
                    <th>Bearbeiten</th>
                    <th>Löschen</th>
                </tr>
            </thead>
            <tbody>
            {drinks.map((drink) => (
                <tr key={drink.id}>
                    <td>{drink.bezeichnung}</td>
                    <td>{drink.preis}</td>
                    <td>
                        <button type="button" className="btn btn-success btn-sm"
                            onClick={() => onEdit(drink)}
                        >
                            Bearbeiten
                        </button>
                    </td>
                    <td>
                        <button type="button" className="btn btn-success btn-sm"
                            onClick={() => onDelete(drink.id)}
                        >
                            Löschen
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    );
}

export default Getraenke
