function ListaImagenes({ imagenes }) {

  if (imagenes.length === 0) {
    return <p className="mensajenoimagenes">No Hay imagenes que mostrar</p>;
  }

  return (
    <div className="lista">
      {imagenes.map((imagen) => (
        <figure key={imagen.id}>
          <img src={imagen.url}  />
          <figcaption>{imagen.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default ListaImagenes;