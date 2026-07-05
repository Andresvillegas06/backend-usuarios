import { Router } from 'express'
import { listarUsuarios } from '../controllers/admin.controller.js'
import { requiereAutenticacion } from '../middlewares/auth.middleware.js'
import { requiereRol } from '../middlewares/rol.middleware.js'

const router = Router()

router.get('/usuarios', requiereAutenticacion, requiereRol('administrador'), listarUsuarios)

export default router
