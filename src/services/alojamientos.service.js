const alojamientos = []
let siguienteId = 1

export function listarAlojamientos() {
  return alojamientos
}

export function buscarPorId(id) {
  return alojamientos.find((alojamiento) => alojamiento.id === id) ?? null
}

export function crearAlojamiento({ titulo, descripcion, ciudad, precio, propietarioId }) {
  const nuevoAlojamiento = {
    id: siguienteId++,
    titulo,
    descripcion,
    ciudad,
    precio,
    propietarioId,
  }

  alojamientos.push(nuevoAlojamiento)
  return nuevoAlojamiento
}

export function actualizarAlojamiento(id, datos) {
  const alojamiento = buscarPorId(id)
  if (!alojamiento) return null

  if (datos.titulo !== undefined) alojamiento.titulo = datos.titulo
  if (datos.descripcion !== undefined) alojamiento.descripcion = datos.descripcion
  if (datos.ciudad !== undefined) alojamiento.ciudad = datos.ciudad
  if (datos.precio !== undefined) alojamiento.precio = datos.precio

  return alojamiento
}

export function eliminarAlojamiento(id) {
  const indice = alojamientos.findIndex((alojamiento) => alojamiento.id === id)
  if (indice === -1) return false

  alojamientos.splice(indice, 1)
  return true
}

export function sembrarAlojamientos() {
  if (alojamientos.length > 0) return

  crearAlojamiento({
    titulo: 'Apartamento en el centro',
    descripcion: 'Cómodo apartamento cerca de todo, ideal para viajes cortos.',
    ciudad: 'Bogotá',
    precio: 120000,
    propietarioId: 1,
  })

  crearAlojamiento({
    titulo: 'Casa frente al mar',
    descripcion: 'Casa amplia con vista al mar, perfecta para descansar.',
    ciudad: 'Santa Marta',
    precio: 250000,
    propietarioId: 1,
  })
}
