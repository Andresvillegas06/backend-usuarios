import jwt from 'jsonwebtoken'

const SECRETO = process.env.JWT_SECRET

export function firmarToken(payload) {
  return jwt.sign(payload, SECRETO, { expiresIn: '1d' })
}

export function verificarToken(token) {
  return jwt.verify(token, SECRETO)
}
