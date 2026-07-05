import * as usuariosService from '../services/usuarios.service.js'

export function listarUsuarios(req, res) {
  res.json(usuariosService.listarUsuarios())
}
