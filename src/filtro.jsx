function Filtro({ setTextoFiltro }) {
  return (
    <div >
      <h3>Filtrar por Título</h3>
      <input
        type="text"
        placeholder="EJ: FOTO 2 (MAYUSCULAS)"
        onChange={(e) => setTextoFiltro(e.target.value)}
      />
    </div>
  );
}

export default Filtro;