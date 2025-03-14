import useScreenSize from "../utils/useScreenSize";

const Getraenke = ({ getraenke, onEdit, onRefresh, onDelete, onAdd }) => {
    const screenSize = useScreenSize();
    const numberformat= new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (
      <div className="container mt-4">
        <h1 className="text-info bg-dark p-2 text-center">Getränkeliste <button type="button" onClick={() => onAdd()} className="btn btn-primary">+</button></h1>
        <button className="btn btn-success btn-sm" onClick={onRefresh}>
          🔄 Aktualisieren
        </button>
        <table className="table table-bordered mt-2 border-primary p-1">
            <thead>
                <tr>
                    <th>Bezeichnung</th>
                    <th className="text-end">Preis (€)</th>
                    {screenSize ==="sm" || screenSize ==="xs" ? 
                        <th className="text-center">
                            <i className="bi bi-pencil-square"></i>
                        </th> 
                        :
                        <th className="text-center">Bearbeiten</th>
                    }
                    {screenSize ==="sm" || screenSize ==="xs" ? 
                        <th className="text-center">
                            <i className="bi bi-x-square"></i>
                        </th>
                        :
                        <th className="text-center">Löschen</th>
                    }
                    
                </tr>
            </thead>
            <tbody>
            {getraenke.map((drink) => (
                <tr key={drink.id}>
                    <td>{drink.bezeichnung}</td>
                    <td className="text-end">{numberformat.format(drink.preis)}</td>
                    {screenSize ==="sm" || screenSize ==="xs" ? 
                        <td className="text-center">
                            <button type="button" className="btn bg-primary text-light"
                                onClick={() => onEdit(drink)}>
                                <i className="bi bi-pencil-square"></i>
                            </button>
                        </td> 
                        :
                         <td className="text-center">
                            <button type="button" className="btn bg-primary text-light"
                                onClick={() => onEdit(drink)}>
                                Bearbeiten
                            </button>
                        </td>
                    }
                    {screenSize ==="sm" || screenSize ==="xs" ? 
                        <td className="text-center">
                            <button type="button" className="btn bg-danger text-light"
                                onClick={() => onDelete(drink.id)}>
                                <i className="bi bi-x-square"></i>
                            </button>
                            
                        </td>
                        :
                        <td className="text-center">
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
