module.exports = (app, str, response) => {

    const tipoUsuario = app.get('tipo_usuarios')

    return {
        create: (req, res) => { createTipoUsuario(req, res, str, response, tipoUsuario) },
        delete: (req, res) => { deleteTipoUsuario(req, res, str, response, tipoUsuario) },
        getAll: (req, res) => { getAllTipoUsuario(res, str, response, tipoUsuario) }
    }
}

async function createTipoUsuario(req, res, str, response, tipoUsuario) {
    try {

        const newTipoUsuario = await tipoUsuario.create({
            tipo: req.body.tipo
        })

        res.json(new response(true, str.create, null, newTipoUsuario))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteTipoUsuario(req, res, str, response, tipoUsuario) {
    try {

        const deleteTipoUsuario = await tipoUsuario.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json(new response(true, str.delete, null, deleteTipoUsuario))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllTipoUsuario(res, str, response, tipoUsuario) {
    try {

        const TipoUsuarios = await tipoUsuario.findAll()

        res.json(new response(true, str.get, null, TipoUsuarios))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}