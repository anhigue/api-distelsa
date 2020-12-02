const jwt = require('jsonwebtoken')
const config = require('../config/config')
const Response = require('../models/respuestas/response')

const verifyToken = (req, res, next) => {

    const token = req.get('Authorization');

    if (!token) {
        res.status(401).json({
            ok: false,
            message: 'Unauthorized'
        })
    }

    jwt.verify(token, config.seed, (err, decoded) => {

        if (err) {
            return res.status(401).json(new Response(true, 'Algo salido mal', null, null));
        } else {
            req.body.usuarioToken = decoded
            next();
        }
    });

};

module.exports = {
    verifyToken
};