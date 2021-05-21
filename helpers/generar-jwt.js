const jwt = require('jsonwebtoken')

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {


        const payload = { uid }

        //aqui jeneramos el token
        jwt.sign(payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {

                console.log(err)
                reject('No se puedo generar el token')

            } else {

                resolve(token)

            }
        })


    })
}

module.exports = {
    generarJWT
}