
import { useState, useEffect } from 'react'
import ListaTareas from './components/ListaTareas'
import Tarjeta from './components/Tarjeta'

function App() {
  // Estados principales
  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [reintento, setReintento] = useState(0)
    const [buscar, setBuscar] = useState('')
    const[resumen, setResumen] = useState({
      total: 0,
      completado: 0,
      pendientes: 0
    })


  // Obtener las tareas desde la API
 useEffect(() => {
  
  const controlador = new AbortController()

  const temporizador = setTimeout(async () => {
    try {
      setCargando(true)
      setError('')

      const respuesta = await fetch(
        `${import.meta.env.VITE_API_URL}/tareas?buscar=${encodeURIComponent(buscar)}`,
        { signal: controlador.signal }
      )

      if (!respuesta.ok) {
        throw new Error('Error al obtener las tareas')
      }

      const datos = await respuesta.json()

      console.log('Tareas recibidas:', datos)
      setTareas(datos)

    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error.message)
      }
    } finally {
      if (!controlador.signal.aborted) {
        setCargando(false)
      }
    }
  }, 400)

  return () => {
    clearTimeout(temporizador)
    controlador.abort()
  }

}, [buscar, reintento])

// Obtener el resumen de tareas
useEffect(() => {
  async function cargarResumen() {
    try {
      const respuesta = await fetch(
        `${import.meta.env.VITE_API_URL}/tareas/resumen`
      )

      if (!respuesta.ok) {
        throw new Error('Error al obtener el resumen')
      }

      const datos = await respuesta.json()

      setResumen(datos)

    } catch (error) {
      console.error('Error al cargar el resumen:', error)
    }
  }

  cargarResumen()
}, [reintento])

  // Estados de los controles
  const [filtro, setFiltro] = useState('todas')
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  const [nuevaPrioridad, setNuevaPrioridad] = useState('media')

  // Estado del contador de clics
  const [contadorClics, setContadorClics] = useState(0)

  // Registrar un clic
  function registrarClic() {
    setContadorClics(anterior => anterior + 1)
  }

  // Restar un clic sin permitir números negativos
  function restarClic() {
    setContadorClics(anterior => anterior > 0 ? anterior - 1 : 0)
  }

  // Reiniciar contador
  function reiniciarContador() {
    setContadorClics(0)
  }

  // Agregar una tarea
  
// Agregar una tarea
async function agregarTarea(e) {
  e.preventDefault()

  if (nuevoTitulo.trim() === '') return

  try {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/tareas`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo: nuevoTitulo.trim(),
          prioridad: nuevaPrioridad
        })
      }
    )

    if (!respuesta.ok) {
      const datosError = await respuesta.json()
      throw new Error(datosError.error || 'No se pudo crear la tarea')
    }

    const tareaCreada = await respuesta.json()

    // Incorporamos a la lista la tarea guardada en MySQL
    setTareas(tareasAnteriores => [...tareasAnteriores, tareaCreada])

    setNuevoTitulo('')
    setNuevaPrioridad('media')

  } catch (error) {
    console.error('Error al agregar tarea:', error)
    alert(error.message)
  }
}


  // Marcar o desmarcar una tarea
  function alternarTarea(id) {
    setTareas(tareasAnteriores =>
      tareasAnteriores.map(tarea =>
        tarea.id === id
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      )
    )
  }

  // Eliminar una tarea
  function eliminarTarea(id) {
    setTareas(tareasAnteriores =>
      tareasAnteriores.filter(tarea => tarea.id !== id)
    )
  }

  // Editar una tarea
  function editarTarea(id) {
    const tarea = tareas.find(t => t.id === id)
    if (!tarea) return

    const nuevoTitulo = prompt('Nuevo título:', tarea.titulo)

    if (nuevoTitulo === null || nuevoTitulo.trim() === '') return

    setTareas(tareasAnteriores =>
      tareasAnteriores.map(tarea =>
        tarea.id === id
          ? { ...tarea, titulo: nuevoTitulo.trim() }
          : tarea
      )
    )
  }

  // Borrar tareas completadas
  function borrarCompletadas() {
    setTareas(tareasAnteriores =>
      tareasAnteriores.filter(tarea => !tarea.completada)
    )
  }

  // Contar tareas completadas
  const completadas = tareas.filter(tarea => tarea.completada).length

  // Filtrar tareas
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'pendientes') return !tarea.completada
    if (filtro === 'completadas') return tarea.completada
    return true
  })

  // Ordenar por prioridad
  const orden = { alta: 0, media: 1, baja: 2 }

  const ordenadas = [...tareasFiltradas].sort(
    (a, b) => orden[a.prioridad] - orden[b.prioridad]
  )

  return (
    <div className="contenedor">
      <h1>Tareas</h1>

      <Tarjeta titulo="Mis tareas">
        <div className="resumen-tareas">
  <h3>Resumen de tareas</h3>

  <p>Total: {resumen.total}</p>

  <p>Completadas: {resumen.completadas}</p>

  <p>Pendientes: {resumen.pendientes}</p>

  <strong>
    {resumen.pendientes} pendientes de {resumen.total} tareas
  </strong>
</div>

        {/* Estado de carga */}
        {cargando && <p>Cargando tareas...</p>}

        {/* Estado de error */}
{!cargando && error && (
  <div>
    <p>Error: {error}</p>

    <button onClick={() => setReintento(valor => valor + 1)}>
      Reintentar
    </button>
  </div>
)}
        {/* Contenido cuando la carga terminó correctamente */}
        {!cargando && !error && (
          <>
            {/* Contador de clics */}
            <h2>Contador de clics</h2>

            <p>Cantidad de clics: {contadorClics}</p>

            <button onClick={registrarClic}>
              Sumar clic
            </button>

            <button onClick={restarClic}>
              Restar clic
            </button>

            <button onClick={reiniciarContador}>
              Reiniciar contador
            </button>

            <hr />

            <p className="resumen">
              {completadas} de {tareas.length} completadas
            </p>

            <form onSubmit={agregarTarea}>
              <input
                type="text"
                placeholder="Nueva tarea"
                value={nuevoTitulo}
                onChange={e => setNuevoTitulo(e.target.value)}
              />

              <select
                value={nuevaPrioridad}
                onChange={e => setNuevaPrioridad(e.target.value)}
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>

              <button type="submit">Agregar tarea</button>
            </form>

<h3>Buscar tareas</h3>

<input
  type="text"
  placeholder="Escribí el nombre de una tarea..."
  value={buscar}
  onChange={e => setBuscar(e.target.value)}
/>

            <h3>Filtros</h3>

            <button onClick={() => setFiltro('todas')}>Todas</button>
            <button onClick={() => setFiltro('pendientes')}>Pendientes</button>
            <button onClick={() => setFiltro('completadas')}>Completadas</button>

            <p>Tareas pendientes: {tareas.length - completadas}</p>

            <button onClick={borrarCompletadas}>
              Borrar completadas
            </button>

            <ListaTareas
              tareas={ordenadas}
              onAlternar={alternarTarea}
              onEliminar={eliminarTarea}
              onEditar={editarTarea}
            />
          </>
        )}

      </Tarjeta>
    </div>
  )
}

export default App
