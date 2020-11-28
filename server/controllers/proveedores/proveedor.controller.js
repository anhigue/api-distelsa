module.exports = (app, str, response) => {

    const proveedor = app.get('proveedores')

    return {
        create: (req, res) => { createProveedores(req, res, str, response, proveedor) },
        update: (req, res) => { updateProveedores(req, res, str, response, proveedor) },
        delete: (req, res) => { deleteProveedores(req, res, str, response, proveedor) },
        getAll: (req, res) => { getAllProveedores(res, str, response, proveedor) }
    }
}

async function createProveedores(req, res, str, response, proveedor) {
    try {

        const newProveedores = await proveedor.create({
            proveedor: req.body.proveedor,
            estado: req.body.estado
        })

        res.json(new response(true, str.create, null, newProveedores))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updateProveedores(req, res, str, response, proveedor) {
    try {

        const newProveedores = await proveedor.update({
            proveedor: req.body.proveedor,
            estado: req.body.estado
        }, {
            where: {
                id: req.body.id
            }
        })

        res.json(new response(true, str.update, null, newProveedores))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteProveedores(req, res, str, response, proveedor) {
    try {

        const deleteProveedores = await proveedor.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json(new response(true, str.delete, null, deleteProveedores))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllProveedores(res, str, response, proveedor) {
    try {

        const Proveedores = await proveedor.findAll()

        res.json(new response(true, str.get, null, Proveedores))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}