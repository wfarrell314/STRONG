var sql = require("mssql/msnodesqlv8");
var config = require('./config');

module.exports = {

  exeQuery: async function (query) {
    var conn = new sql.ConnectionPool(config.sql);
    var req = new sql.Request(conn);
    try {
      await conn.connect();
      let data = await req.query(query)
      return data;
    } catch (err) {
      return err;
    }
  }
};