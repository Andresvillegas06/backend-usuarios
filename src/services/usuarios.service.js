import bcrypt from 'bcryptjs'

const usuarios = []
let siguienteId = 1

function quitarPassword(usuario) {
  const { password, ...usuarioSinPassword } = usuario
  return usuarioSinPassword
}

export function buscarPorEmail(email) {
  return usuarios.find((usuario) => usuario.email === email)
}

export function buscarPorId(id) {
  const usuario = usuarios.find((usuario) => usuario.id === id)
  return usuario ? quitarPassword(usuario) : null
}

export async function crearUsuario({ nombre, email, password }) {
  const passwordHasheado = await bcrypt.hash(password, 10)

  const nuevoUsuario = {
    id: siguienteId++,
    nombre,
    email,
    password: passwordHasheado,
  }

  usuarios.push(nuevoUsuario)
  return quitarPassword(nuevoUsuario)
}

export async function validarCredenciales(email, password) {
  const usuario = buscarPorEmail(email)
  if (!usuario) return null

  const passwordValido = await bcrypt.compare(password, usuario.password)
  if (!passwordValido) return null

  return quitarPassword(usuario)
}

export function actualizarUsuario(id, datos) {
  const usuario = usuarios.find((usuario) => usuario.id === id)
  if (!usuario) return null

  if (datos.nombre) usuario.nombre = datos.nombre

  return quitarPassword(usuario)
}
