module.exports = (app, str, response) => {

    const usuarios = app.get('usuarios')
    const utiles = require('../../utils/utils')

    return {
        create: (req, res) => { createUsuarios(req, res, str, response, utiles, usuarios) },
        update: (req, res) => { updateUsuarios(req, res, str, response, usuarios) },
        delete: (req, res) => { deleteUsuarios(req, res, str, response, usuarios) },
        getAll: (req, res) => { getAllUsuarios(res, str, response, usuarios) }
    }
}

async function createUsuarios(req, res, str, response, utiles, usuarios) {
    try {

        const password = utiles.encrypt(req.body.password)

        const newUsuarios = await usuarios.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            password,
            estado: true,
            fk_id_tipo_usuario: req.body.fk_id_tipo_usuario
        })

        res.json(new response(true, str.create, null, newUsuarios))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updateUsuarios(req, res, str, response, usuarios) {
    try {

        const newUsuarios = await usuarios.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            estado: req.body.estado,
            fk_id_tipo_usuario: req.body.fk_id_tipo_usuario
        }, {
            where: { id: req.body.id }
        })

        res.json(new response(true, str.update, null, newUsuarios))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteUsuarios(req, res, str, response, usuarios) {
    try {

        const deleteUsuarios = await usuarios.update({
            estado: false
        }, {
            where: {
                id: req.params.id
            }
        })

        res.json(new response(true, str.delete, null, deleteUsuarios))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllUsuarios(res, str, response, usuarios) {
    try {

        const Usuarios = await usuarios.findAll()

        res.json(new response(true, str.get, null, Usuarios))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}