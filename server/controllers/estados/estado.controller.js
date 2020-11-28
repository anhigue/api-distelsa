module.exports = (app, str, response) => {

    const estados = app.get('estados')

    return {
        create: (req, res) => { createEstado(req, res, str, response, estados) },
        delete: (req, res) => { deleteEstado(req, res, str, response, estados) },
        getAll: (req, res) => { getAllEstado(res, str, response, estados) }
    }
}

async function createEstado(req, res, str, response, estados) {
    try {

        const newEstado = await estados.create({
            estado: req.body.estado
        })

        res.json(new response(true, str.create, null, newEstado))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteEstado(req, res, str, response, estados) {
    try {

        const deleteEstado = await estados.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json(new response(true, str.delete, null, deleteEstado))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllEstado(res, str, response, estados) {
    try {

        const Estados = await estados.findAll()

        res.json(new response(true, str.get, null, Estados))

    } catch (error) {
        console.log(error)
        res.json(new response(false, str.errCatch, error, null))
    }
}