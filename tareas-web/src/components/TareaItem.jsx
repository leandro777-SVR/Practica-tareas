import Insignia from './Insignia'

function TareaItem({ titulo, prioridad, completada }) {
  return (
    <li className={`tarea ${completada ? 'tarea--completada' : ''}`}>
      <span>{completada ? '✅' : '⬜'}</span>
      <span className="tarea__titulo">{titulo}</span>
      <Insignia prioridad={prioridad} />
    </li>
  )
}

export default TareaItem