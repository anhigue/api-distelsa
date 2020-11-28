const bcrypt = require('bcryptjs');

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function encrypt(text) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(text, salt);
        return hash
    } catch (error) {
        return null
    }
}

function compareEncrypt(text, hash) {
    try {
        return bcrypt.compareSync(text, hash)
    } catch (error) {
        return false
    }
}

module.exports = {
    normalizePort,
    encrypt,
    compareEncrypt
}