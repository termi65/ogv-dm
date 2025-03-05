import useScreenSize from "../utils/useScreenSize";

const Getraenke = ({ getraenke, onEdit, onRefresh, onDelete, onAdd }) => {
    const screenSize = useScreenSize();
    return (
      <div className="container mt-4">
        <h1 className="text-info bg-dark p-2 text-center">Getränkeliste <button type="button" onClick={() => onAdd()} className="btn btn-primary">+</button></h1>
        <button className="btn btn-success btn-sm" onClick={onRefresh}>
          🔄 Aktualisieren
        </button>
        <p>Bildschirmgröße: {screenSize}</p>
        <table className="table table-bordered mt-2 border-primary p-1">
            <thead>
                <tr>
                    <th>Bezeichnung</th>
                    <th>Preis (€)</th>
                    {screenSize ==="sm" || screenSize ==="xs" ? 
                        <th>
                            <i className="bi bi-pencil-square"></i>
                        </th> 
                        :
                        <th>Bearbeiten</th>
                    }
                    {screenSize ==="sm" || screenSize ==="xs" ? 
                        <th>
                            <i className="bi bi-x-square"></i>
                        </th>
                        :
                        <th>Löschen</th>
                    }
                    
                </tr>
            </thead>
            <tbody>
            {getraenke.map((drink) => (
                <tr key={drink.id}>
                    <td>{drink.bezeichnung}</td>
                    <td>{drink.preis}</td>
                    {screenSize ==="sm" || screenSize ==="xs" ? 
                        <td>
                            <button type="button" className="btn bg-primary text-light"
                                onClick={() => onEdit(drink)}>
                                <i className="bi bi-pencil-square"></i>
                            </button>
                        </td> 
                        :
                         <td>
                            <button type="button" className="btn bg-primary text-light"
                                onClick={() => onEdit(drink)}>
                                Bearbeiten
                            </button>
                        </td>
                    }
                    {screenSize ==="sm" || screenSize ==="xs" ? 
                        <td>
                            <button type="button" className="btn bg-danger text-light"
                                onClick={() => onDelete(drink.id)}>
                                <i className="bi bi-x-square"></i>
                            </button>
                            
                        </td>
                        :
                        <td>
                        <button type="button" className="btn bg-danger text-light"
                            onClick={() => onDelete(drink.id)}>
                            Löschen
                        </button>
                    </td>
                    }

                </tr>
            ))}
            </tbody>
        </table>
      </div>
    );
}

export default Getraenke
