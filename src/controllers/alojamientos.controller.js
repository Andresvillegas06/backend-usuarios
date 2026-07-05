import * as alojamientosService from '../services/alojamientos.service.js'
import { buscarPorId as buscarUsuarioPorId } from '../services/usuarios.service.js'

function tienePermisoDeGestion(req, alojamiento) {
  if (alojamiento.propietarioId === req.usuarioId) return true

  const usuario = buscarUsuarioPorId(req.usuarioId)
  return usuario?.rol === 'administrador'
}

export function listar(req, res) {
  res.json(alojamientosService.listarAlojamientos())
}

export function obtener(req, res) {
  const id = Number(req.params.id)
  const alojamiento = alojamientosService.buscarPorId(id)

  if (!alojamiento) {
    return res.status(404).json({ mensaje: 'Alojamiento no encontrado' })
  }

  res.json(alojamiento)
}

export function crear(req, res) {
  const { titulo, descripcion, ciudad, precio } = req.body

  if (!titulo || !ciudad || !precio) {
    return res.status(400).json({ mensaje: 'Título, ciudad y precio son obligatorios' })
  }

  const alojamiento = alojamientosService.crearAlojamiento({
    titulo,
    descripcion,
    ciudad,
    precio,
    propietarioId: req.usuarioId,
  })

  res.status(201).json(alojamiento)
}

export function actualizar(req, res) {
  const id = Number(req.params.id)
  const alojamiento = alojamientosService.buscarPorId(id)

  if (!alojamiento) {
    return res.status(404).json({ mensaje: 'Alojamiento no encontrado' })
  }

  if (!tienePermisoDeGestion(req, alojamiento)) {
    return res.status(403).json({ mensaje: 'No tienes permisos para editar este alojamiento' })
  }

  const actualizado = alojamientosService.actualizarAlojamiento(id, req.body)
  res.json(actualizado)
}

export function eliminar(req, res) {
  const id = Number(req.params.id)
  const alojamiento = alojamientosService.buscarPorId(id)

  if (!alojamiento) {
    return res.status(404).json({ mensaje: 'Alojamiento no encontrado' })
  }

  if (!tienePermisoDeGestion(req, alojamiento)) {
    return res.status(403).json({ mensaje: 'No tienes permisos para eliminar este alojamiento' })
  }

  alojamientosService.eliminarAlojamiento(id)
  res.status(204).send()
}
