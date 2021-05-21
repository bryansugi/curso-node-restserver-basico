const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async(req, res = response) => {

    const { correo, password } = req.body

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            res.status(400).json({
                msg: 'Usuaurio / password no son correctos - correo'
            })
        }

        // verificar el usuario esta activo
        if (!usuario.estado) {
            res.status(400).json({
                msg: 'Usuario no esta activo'
            })
        }


        //verificar ña cpontraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            })
        }

        //generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })


    } catch (error) {

        console.log(error)

        res.status(500).json({
            msj: 'Hable con el administrador'
        })
    }


}

module.exports = {
    login
}