function Insignia({ prioridad = 'media' }) {
  return (
    <span className={`insignia insignia--${prioridad}`}>
      {prioridad}
    </span>
  )
}

export default Insignia