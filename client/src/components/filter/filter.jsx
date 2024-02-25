import './filter.styles.css'
const Filter = ({ handleTemperamentChange, handleOriginChange, handleSortChange, handleWeightChange, temperaments }) => {
    return (
        <div className="filter-container">
            {temperaments.length > 0 ? (
                <>
                    <label className="filter-label">
                        Filtrar por Temperamento:
                        <select className="filter-select" onChange={handleTemperamentChange}>
                            <option value="">Todos</option>
                            {temperaments.map((temperament) => (
                                <option key={temperament.name || temperament.name} value={temperament.name}>
                                    {temperament.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="filter-label">
                        Filtrar por Origen:
                        <select className="filter-select" onChange={handleOriginChange}>
                            <option value="">Todos</option>
                            <option value="API">API</option>
                            <option value="BASE_DE_DATOS">BASE DE DATOS</option>
                        </select>
                    </label>
                   

                    <label className="filter-label">
                        Ordenar por Letra:
                        <select className="filter-select" onChange={handleSortChange}>
                            <option value="">Todos</option>
                            <option value="alphabeticalAsc">A-Z</option>
                            <option value="alphabeticalDesc">Z-A</option>
                        </select>
                    </label>

                    <label className="filter-label">
                        Peso:
                        <select className="filter-select" onChange={handleWeightChange}>
                            <option value="">Todos</option>
                            <option value="weightAsc">ASC</option>
                            <option value="weightDesc">DESC</option>
                        </select>
                    </label>
                </>
            ) : (
                <p>Cargando temperamentos...</p>
            )}
        </div>
    );
};

export default Filter;

