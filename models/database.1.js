var sql = require("mssql/msnodesqlv8");
var config = require('./config');


module.exports = {

  exeQuery: function (query) {
    return new Promise((resolve, reject) => {
      var conn = new sql.ConnectionPool(config.sql);
      var req = new sql.Request(conn);
      conn.connect(function (err) {
        if (err) {
          reject(err);
        } else {
          req.query(query, function (err, recordset) {
            if (err) {
              conn.close();
              reject(err);
            } else {
              conn.close();
              resolve(recordset);
            };
          });
        };
      });
    });
  }




  
};


































// module.exports = {

//   exeQuery: function (query) {
//     return new Promise((resolve, reject) => {
//       var conn = new sql.ConnectionPool(config.sql);
//       var req = new sql.Request(conn);
//       conn.connect(function (err) {
//         if (err) {
//           reject(err);
//         } else {
//           req.query(query, function (err, recordset) {
//             if (err) {
//               console.log(err);
//               conn.close();
//               reject(err);
//             } else {
//               conn.close();
//               resolve(recordset);
//             };
//           });
//         };
//       });
//     });
//   }
// };