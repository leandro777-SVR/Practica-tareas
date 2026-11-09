function Tarjeta({ titulo, children }) {
  return (
    <section className="tarjeta">
      <h2>{titulo}</h2>
      {children}
    </section>
  )
}

export default Tarjeta