const { response } = require('express')

const usuariosGet = (req, res = response) => {

    const { hobby = 'No hobby', gustos = 'No gustos' } = req.query

    res.json({
        msg: 'get de mi api -controller',
        hobby,
        gustos
    })
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body
    res.status(201).json({
        msg: 'post de mi api -controller',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.status(500).json({
        msg: 'put de mi api -controller',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch de mi api -controller'
    })
}

const usuariosDelete = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'delete de mi api -controller',
        id
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}