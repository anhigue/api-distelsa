module.exports = (app, str, response) => {

    const material = app.get('materiales')
    const tipoMaterial = app.get('tipo_materiales')

    return {
        create: (req, res) => { createMateriales(req, res, str, response, material) },
        update: (req, res) => { updateMateriales(req, res, str, response, material) },
        delete: (req, res) => { deleteMateriales(req, res, str, response, material) },
        getAll: (req, res) => { getAllMateriales(res, str, response, material, tipoMaterial) }
    }
}

async function createMateriales(req, res, str, response, material) {
    try {

        const newMateriales = await material.create({
            material: req.body.material,
            fk_id_tipo_material: req.body.fk_id_tipo_material
        })

        res.json(new response(true, str.create, null, newMateriales))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updateMateriales(req, res, str, response, material) {
    try {

        const newMateriales = await material.update({
            material: req.body.material,
            fk_id_tipo_material: req.body.fk_id_tipo_material
        }, {
            where: {
                id: req.body.id
            }
        })

        res.json(new response(true, str.update, null, newMateriales))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteMateriales(req, res, str, response, material) {
    try {

        const deleteMateriales = await material.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json(new response(true, str.delete, null, deleteMateriales))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllMateriales(res, str, response, material, tipoMaterial) {
    try {

        const Materiales = await material.findAll({ include: [tipoMaterial] })

        res.json(new response(true, str.get, null, Materiales))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}