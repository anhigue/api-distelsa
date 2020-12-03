module.exports = (app, str, response) => {

    const usuarios = app.get('usuarios')
    const utiles = require('../../utils/utils')
    const jwt = require('jsonwebtoken')
    const config = require('../../config/config')

    return {
        validate: (req, res, next) => { validateUsuario(req, res, next, str, response, usuarios) },
        login: (req, res) => { authUser(req, res, str, response, utiles, jwt, config) },
    }
}

async function validateUsuario(req, res, next, str, response, usuarios) {
    try {

        const findUsuario = await usuarios.findOne({ where: { correo: req.body.correo, estado: true } })

        if (findUsuario) {
            req.body.usuario = findUsuario
            next()
        } else {
            res.json(new response(false, str.getErr, null, null))
        }

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function authUser(req, res, str, response, utiles, jwt, config) {
    try {
        const findUsuario = req.body.usuario
        const password = req.body.password

        const login = utiles.compareEncrypt(password, findUsuario.password)

        if (login) {

            const options = { expiresIn: '24h' }
            const token = jwt.sign(findUsuario.toJSON(), config.seed, options);

            res.json(new response(true, str.getAll, null, {
                token,
                expiresIn: options.expiresIn,
                usuario: findUsuario
            }))

        } else {
            res.json(new response(false, str.getErr, null, null))
        }

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}