import { Router } from 'express'
import { registro, login, obtenerPerfil, actualizarPerfil } from '../controllers/usuarios.controller.js'
import { requiereAutenticacion } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/registro', registro)
router.post('/login', login)
router.get('/perfil', requiereAutenticacion, obtenerPerfil)
router.patch('/perfil', requiereAutenticacion, actualizarPerfil)

export default router
