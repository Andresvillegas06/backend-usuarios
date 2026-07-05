import { buscarPorId } from '../services/usuarios.service.js'

export function requiereRol(rolEsperado) {
  return (req, res, next) => {
    const usuario = buscarPorId(req.usuarioId)

    if (!usuario) {
      return res.status(401).json({ mensaje: 'No se encontró un token de acceso' })
    }

    if (usuario.rol !== rolEsperado) {
      return res.status(403).json({ mensaje: 'No tienes permisos para acceder a este recurso' })
    }

    next()
  }
}
