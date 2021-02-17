module.exports = (app, str, response) => {

    const materialesTienda = app.get('materiales_tienda')
    const material = app.get('materiales')
    const tipoMaterial = app.get('tipo_materiales')
    const moneda = app.get('monedas')
    const tiendas = app.get('tiendas')

    return {
        create: (req, res) => { createMaterialesTienda(req, res, str, response, materialesTienda) },
        update: (req, res) => { updateMaterialesTienda(req, res, str, response, materialesTienda) },
        delete: (req, res) => { deleteMaterialesTienda(req, res, str, response, materialesTienda) },
        getAll: (req, res) => { getAllMaterialesTienda(res, str, response, materialesTienda, material, tipoMaterial, moneda, tiendas) },
        getAllByTienda: (req, res) => { getAllByIdTienda(req, res, str, response, materialesTienda, material, tipoMaterial, moneda, tiendas) }
    }
}

async function createMaterialesTienda(req, res, str, response, materialesTienda) {
    try {

        const newMaterialesTienda = await materialesTienda.create({
            dimension: req.body.dimension,
            url_imagen: req.body.url_imagen,
            cantidad: req.body.cantidad,
            maximo: req.body.maximo,
            precio: req.body.precio,
            fk_id_material: req.body.fk_id_material,
            fk_id_tienda: req.body.fk_id_tienda,
            fk_id_moneda: req.body.fk_id_moneda
        })

        res.json(new response(true, str.create, null, newMaterialesTienda))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updateMaterialesTienda(req, res, str, response, materialesTienda) {
    try {

        const newMaterialesTienda = await materialesTienda.update({
            dimension: req.body.dimension,
            url_imagen: req.body.url_imagen,
            cantidad: req.body.cantidad,
            maximo: req.body.maximo,
            precio: req.body.precio,
            fk_id_material: req.body.fk_id_material,
            fk_id_tienda: req.body.fk_id_tienda,
            fk_id_moneda: req.body.fk_id_moneda
        }, {
            where: {
                id: req.body.id
            }
        })

        res.json(new response(true, str.update, null, newMaterialesTienda))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function deleteMaterialesTienda(req, res, str, response, materialesTienda) {
    try {

        const deleteMaterialesTienda = await materialesTienda.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json(new response(true, str.delete, null, deleteMaterialesTienda))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllMaterialesTienda(res, str, response, materialesTienda, material, tipoMaterial, moneda, tiendas) {
    try {

        const MaterialesTienda = await materialesTienda.findAll({
            include: [{ model: material, include: [tipoMaterial] }, moneda, tiendas]
        })

        res.json(new response(true, str.get, null, MaterialesTienda))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAllByIdTienda(req, res, str, response, materialesTienda, material, tipoMaterial, moneda, tiendas) {
    try {

        const MaterialesTienda = await materialesTienda.findAll({
            where: {
                fk_id_tienda: req.params.id
            },
            include: [{ model: material, include: [tipoMaterial] }, moneda, tiendas]
        })

        res.json(new response(true, str.get, null, MaterialesTienda))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}