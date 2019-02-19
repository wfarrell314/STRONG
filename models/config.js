//Config
//var port = process.env.port;
var config = {
    sql: {
        driver: 'msnodesqlv8',
        server: 'DESKTOP-VE9R1J3',
        port: 1433,
        database: 'node_test',
        options: {
            trustedConnection: true,
            useUTC: true
        }
    }
};
module.exports = config;