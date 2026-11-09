import TareaItem from './TareaItem'

function ListaTareas({ tareas }) {
  if (tareas.length === 0) {
    return <p className="vacio">No hay tareas todavía</p>
  }

  return (
    <ul className="lista">
      {tareas.map((tarea) => (
        <TareaItem key={tarea.id} {...tarea} />
      ))}
    </ul>
  )
}

export default ListaTareas