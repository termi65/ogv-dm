const Getraenke = ({ drinks, onEdit, onRefresh }) => {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold">Getränkeliste</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-2" onClick={onRefresh}>
          🔄 Aktualisieren
        </button>
        <ul>
          {drinks.map((drink) => (
            <li key={drink.id} className="flex justify-between my-2">
              {drink.bezeichnung} - {drink.preis}€
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => onEdit(drink)}
              >
                Bearbeiten
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Getraenke