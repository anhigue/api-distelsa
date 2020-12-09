module.exports = (app, str, response) => {

    const arrendamientos = app.get('arrendamientos')
    const arrendamientosMateriales = app.get('arrendamientos_materiales')
    const materiales = app.get('materiales')
    const materialesTienda = app.get('materiales_tienda')
    const tipoMaterial = app.get('tipo_materiales')
    const monedas = app.get('monedas')
    const estados = app.get('estados')
    const tiendas = app.get('tiendas')
    const proveedores = app.get('proveedores')

    return {
        getAll: (req, res) => { getAll(req, res, str, response, arrendamientos, arrendamientosMateriales, materialesTienda, materiales, tipoMaterial, monedas, estados, tiendas, proveedores) },
        create: (req, res) => { createArrendamiento(req, res, str, response, arrendamientos, arrendamientosMateriales, materialesTienda) },
        updateState: (req, res) => { updateEstado(req, res, str, response, arrendamientos, arrendamientosMateriales, materialesTienda) }
    }
}

async function createArrendamiento(req, res, str, response, arrendamientos, arrendamientosMateriales, materialesTienda) {
    try {

        const arrendamiento = req.body.arrendamiento;
        const arrendamientoMaterial = req.body.materiales;

        if (!arrendamiento & !arrendamientoMaterial) {
            res.json(new response(false, str.error, error, null))
        }

        const newArrendamiento = await arrendamientos.create({
            fecha_inicio: arrendamiento.fecha_inicio,
            fecha_fin: arrendamiento.fecha_fin,
            fecha: new Date(),
            total: arrendamiento.total,
            fk_id_estado: arrendamiento.fk_id_estado,
            fk_id_usuario: arrendamiento.fk_id_usuario,
            fk_id_proveedor: arrendamiento.fk_id_proveedor,
            fk_id_moneda: arrendamiento.fk_id_moneda,
            arrendamientos_materiales: arrendamientoMaterial
        }, {
            include: [arrendamientosMateriales]
        })

        //  Esta opcion es si es un presupuesto
        if (newArrendamiento.fk_id_estado === 4) {
            res.json(new response(true, str.create, null, newArrendamiento))
        }

        //  Esta opcion es si es cancelacion o cerrado
        if (newArrendamiento.fk_id_estado === 2 || newArrendamiento.fk_id_estado === 3) {
            const data = await updateUpStock(res, str, response, newArrendamiento, materialesTienda)
            res.json(new response(true, str.create, null, newArrendamiento))
        }

        //  Esta opcion es si es un arredamiento activo
        if (newArrendamiento.fk_id_estado === 1) {
            const data = await updateDownStock(res, str, response, newArrendamiento, materialesTienda)
            res.json(new response(true, str.create, null, newArrendamiento))
        }



    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}
// Esta funcion se encarga de actualizar el inventario de los materiales de tienda en caso de que sea un cierre o canselacion
async function updateUpStock(res, str, response, newArrendamiento, materialesTienda) {
    try {
        const dataUpdate = [];
        const arrayMateriales = newArrendamiento.arrendamientos_materiales;

        if (arrayMateriales.length > 0) {

            await arrayMateriales.forEach(async (material) => {
                const cantidadActual = await materialesTienda.findOne({ where: { id: material.fk_id_material_tienda } })
                const materialUpdate = await materialesTienda.update({ cantidad: (cantidadActual.cantidad + material.cantidad) }, { where: { id: material.fk_id_material_tienda } })
                dataUpdate.push(materialUpdate);
            })

            return dataUpdate;

        }

        return dataUpdate;

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}
// Esta funcion se encarga de rebajar los inventarios de tienda en caso de que sean un arrendamiento activo
async function updateDownStock(res, str, response, newArrendamiento, materialesTienda) {
    try {
        const dataUpdate = [];
        const arrayMateriales = newArrendamiento.arrendamientos_materiales;

        if (arrayMateriales.length > 0) {

            await arrayMateriales.forEach(async (material) => {
                const cantidadActual = await materialesTienda.findOne({ where: { id: material.fk_id_material_tienda } })
                const materialUpdate = await materialesTienda.update({ cantidad: (cantidadActual.cantidad - material.cantidad) }, { where: { id: material.fk_id_material_tienda } })
                dataUpdate.push(materialUpdate);
            })

            return dataUpdate;

        }

        return dataUpdate;

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function getAll(req, res, str, response, arrendamientos, arrendamientosMateriales, materialesTienda, materiales, tipoMaterial, monedas, estados, tiendas, proveedores) {
    try {
        const dataArrendamientos = await arrendamientos.findAll({
            include: [
                {
                    model: arrendamientosMateriales,
                    include: [{
                        model: materialesTienda,
                        include: [
                            {
                                model: materiales,
                                include: [tipoMaterial]
                            }, tiendas, monedas]
                    },]
                },
                monedas,
                estados,
                proveedores
            ]
        })

        res.json(new response(true, str.get, null, dataArrendamientos))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}

async function updateEstado(req, res, str, response, arrendamientos, arrendamientosMateriales, materialesTienda) {
    try {

        await arrendamientos.update({ fk_id_estado: req.body.fk_id_estado }, { where: { id: req.body.id } })
        const newArrendamiento = await arrendamientos.findOne({ where: { id: req.body.id }, include: [arrendamientosMateriales] })

        //  Esta opcion es si es cancelacion o cerrado
        if (newArrendamiento.fk_id_estado === 2 || newArrendamiento.fk_id_estado === 3) {
            const data = await updateUpStock(res, str, response, newArrendamiento, materialesTienda)
            res.json(new response(true, str.create, null, newArrendamiento))
        }

        res.json(new response(true, str.create, null, newArrendamiento))

    } catch (error) {
        res.json(new response(false, str.errCatch, error, null))
    }
}