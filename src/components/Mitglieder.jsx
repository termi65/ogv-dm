import useScreenSize from "../utils/useScreenSize";
const Mitglieder = ({ mitglieder, onEdit, onRefresh, onDelete, onAdd }) => {
    const screenSize = useScreenSize();
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
                {mitglieder.map((m) => (
                    <tr key={m.id}>
                        <td>{m.name}</td>
                        <td>{m.vorname}</td>
                        {screenSize ==="sm" || screenSize ==="xs" ? 
                            <td><button type="button" className="btn bg-primary text-light" onClick={() => onEdit(m)}><i className="bi bi-pencil-square"></i></button></td>
                            :
                            <td>
                                <button type="button" className="btn bg-primary text-light" onClick={() => onEdit(m)}>
                                    Bearbeiten
                                </button>
                            </td>
                        }
                        {screenSize ==="sm" || screenSize ==="xs" ? 
                            <td><button type="button" className="btn bg-danger text-light" onClick={() => onDelete(m.id)}><i className="bi bi-x-square"></i></button></td>
                            :
                            <td><button type="button" className="btn bg-danger" onClick={() => onDelete(m.id)}>Löschen</button></td>
                        }
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
  };

export default Mitglieder;