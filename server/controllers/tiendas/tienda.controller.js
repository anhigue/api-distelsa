module.exports = (app, str, response) => {

    const tiendas = app.get('tiendas')

    return {
        create: (req, res) => { createTiendas(req, res, str, response, tiendas) },
        update: (req, res) => { updateTiendas(req, res, str, response, tiendas) },
        delete: (req, res) => { deleteTiendas(req, res, str, response, tiendas) },
        getAll: (req, res) => { getAllTiendas(res, str, response, tiendas) }
    }
}

async function createTiendas(req, res, str, response, tiendas) {
    try {

        const newTiendas = await tiendas.create({
            codigo: req.body.codigo,
            nombre: req.body.nombre
        })

        res.json(new response(true, str.create, null, newTiendas))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updateTiendas(req, res, str, response, tiendas) {
    try {

        const newTiendas = await tiendas.update({
            codigo: req.body.codigo,
            nombre: req.body.nombre
        }, {
            where: {
                id: req.body.id
            }
        })

        res.json(new response(true, str.update, null, newTiendas))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteTiendas(req, res, str, response, tiendas) {
    try {

        const deleteTiendas = await tiendas.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json(new response(true, str.delete, null, deleteTiendas))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllTiendas(res, str, response, tiendas) {
    try {

        const Tiendas = await tiendas.findAll()

        res.json(new response(true, str.get, null, Tiendas))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}