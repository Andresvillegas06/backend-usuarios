import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import usuariosRoutes from './routes/usuarios.routes.js'
import adminRoutes from './routes/admin.routes.js'
import { sembrarAdministrador } from './services/usuarios.service.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/usuarios', usuariosRoutes)
app.use('/admin', adminRoutes)

const PUERTO = process.env.PORT || 8080

await sembrarAdministrador()

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
  console.log('Usuario administrador de prueba: admin@test.com / admin123')
})
