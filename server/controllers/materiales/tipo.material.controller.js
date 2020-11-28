module.exports = (app, str, response) => {

    const tipoMaterial = app.get('tipo_materiales')

    return {
        create: (req, res) => { createTipoMaterial(req, res, str, response, tipoMaterial) },
        delete: (req, res) => { deleteTipoMaterial(req, res, str, response, tipoMaterial) },
        getAll: (req, res) => { getAllTipoMaterial(res, str, response, tipoMaterial) }
    }
}

async function createTipoMaterial(req, res, str, response, tipoMaterial) {
    try {

        const newTipoMaterial = await tipoMaterial.create({
            tipo: req.body.tipo
        })

        res.json(new response(true, str.create, null, newTipoMaterial))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteTipoMaterial(req, res, str, response, tipoMaterial) {
    try {

        const deleteTipoMaterial = await tipoMaterial.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json(new response(true, str.delete, null, deleteTipoMaterial))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllTipoMaterial(res, str, response, tipoMaterial) {
    try {

        const TipoMaterial = await tipoMaterial.findAll()

        res.json(new response(true, str.get, null, TipoMaterial))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}