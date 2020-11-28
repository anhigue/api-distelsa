module.exports = (app, str, response) => {

    const monedas = app.get('monedas')

    return {
        create: (req, res) => { createMoneda(req, res, str, response, monedas) },
        delete: (req, res) => { deleteMoneda(req, res, str, response, monedas) },
        getAll: (req, res) => { getAllMoneda(res, str, response, monedas) }
    }
}

async function createMoneda(req, res, str, response, monedas) {
    try {

        const newMoneda = await monedas.create({
            moneda: req.body.moneda,
            iso: req.body.iso
        })

        res.json(new response(true, str.create, null, newMoneda))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteMoneda(req, res, str, response, monedas) {
    try {

        const deleteMoneda = await monedas.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json(new response(true, str.delete, null, deleteMoneda))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllMoneda(res, str, response, monedas) {
    try {

        const Monedas = await monedas.findAll()

        res.json(new response(true, str.get, null, Monedas))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}