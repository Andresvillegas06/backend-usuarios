import { verificarToken } from '../utils/jwt.js'

export function requiereAutenticacion(req, res, next) {
  const encabezado = req.headers.authorization

  if (!encabezado || !encabezado.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'No se encontró un token de acceso' })
  }

  const token = encabezado.split(' ')[1]

  try {
    const payload = verificarToken(token)
    req.usuarioId = payload.id
    next()
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' })
  }
}
