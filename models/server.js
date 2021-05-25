const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.categoriasPath = '/api/categorias'
        this.productosPath = '/api/productos'
        this.buscarPath = '/api/buscar'

        //conectar a base de datos
        this.conectarDB()

        //middlewares
        this.middlewares()

        //rutas de mi aplicacion
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {

        //cors
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        this.app.use(this.categoriasPath, require('../routes/categorias'))
        this.app.use(this.productosPath, require('../routes/productos'))
        this.app.use(this.buscarPath, require('../routes/buscar'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        })
    }
}

module.exports = Server