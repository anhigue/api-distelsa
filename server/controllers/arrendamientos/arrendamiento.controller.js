module.exports = (app, str, response) => {

    const arrendamientos = app.get('arrendamientos')
    const arrendamientosMateriales = app.get('arrendamientos_materiales')
    const materiales = app.get('materiales')
    const materialesTienda = app.get('materiales_tienda')
    const tipoMaterial = app.get('tipo_materiales')
    const monedas = app.get('monedas')
    const estados = app.get('estados')

    return {
        getAll: (req, res) => { getAll(req, res, str, response, arrendamientos, arrendamientosMateriales, materialesTienda, materiales, tipoMaterial, monedas, estados) },
        create: (req, res) => { }
    }
}

async function createArrendamiento(req, res, str, response, arrendamientos) {
    try {

        const arrendamiento = req.body.arrendamiento;
        const arrendamientoMateriales = req.body.materiales;

        if (!arrendamiento & !arrendamientoMateriales) {
            res.json(new response(false, str.error, error, null))
        }

        const newArrendamiento = await arrendamiento.create(arrendamiento)


        res.json(new response(true, str.create, null, newArrendamiento))


    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAll(req, res, str, response, arrendamientos, arrendamientosMateriales, materialesTienda, materiales, tipoMaterial, monedas, estados) {
    try {
        const dataArrendamientos = await arrendamientos.findAll({
            include: [
                arrendamientosMateriales,
                {
                    model: materialesTienda,
                    include: [
                        {
                            model: materialesTienda,
                            include: [
                                {
                                    model: materiales,
                                    include: [tipoMaterial]
                                }]
                        }]
                },
                monedas,
                estados
            ]
        })

        res.json(new response(true, str.get, null, dataArrendamientos))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}