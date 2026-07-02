import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import usuariosRoutes from './routes/usuarios.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/usuarios', usuariosRoutes)

const PUERTO = process.env.PORT || 8080

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
})
