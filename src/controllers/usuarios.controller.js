import * as usuariosService from '../services/usuarios.service.js'
import { firmarToken } from '../utils/jwt.js'

export async function registro(req, res) {
  try {
    const { nombre, email, password } = req.body

    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Nombre, email y contraseña son obligatorios' })
    }

    const usuarioExistente = usuariosService.buscarPorEmail(email)
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un usuario con ese correo' })
    }

    const usuario = await usuariosService.crearUsuario({ nombre, email, password })
    res.status(201).json(usuario)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar el usuario' })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body

    const usuario = await usuariosService.validarCredenciales(email, password)
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' })
    }

    const token = firmarToken({ id: usuario.id })
    res.json({ token, usuario })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión' })
  }
}

export function obtenerPerfil(req, res) {
  const usuario = usuariosService.buscarPorId(req.usuarioId)

  if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' })
  }

  res.json(usuario)
}

export function actualizarPerfil(req, res) {
  const { nombre } = req.body

  const usuario = usuariosService.actualizarUsuario(req.usuarioId, { nombre })

  if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' })
  }

  res.json(usuario)
}
