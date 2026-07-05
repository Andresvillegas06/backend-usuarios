import { Router } from 'express'
import { listar, obtener, crear, actualizar, eliminar } from '../controllers/alojamientos.controller.js'
import { requiereAutenticacion } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', listar)
router.get('/:id', obtener)
router.post('/', requiereAutenticacion, crear)
router.patch('/:id', requiereAutenticacion, actualizar)
router.delete('/:id', requiereAutenticacion, eliminar)

export default router
