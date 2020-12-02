require('dotenv').config();
module.exports = {
    user: process.env.USER,
    password: process.env.PASS,
    port: process.env.PORT,
    db: process.env.DB,
    dbOptions: {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 20,
            min: 0,
            idle: 10000
        },
        logging: false
    },
    status: process.env.STATE,
    seed: process.env.SEED
};