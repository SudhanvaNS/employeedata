const mysql= require ("mysql");
exports.pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "bit_ise",
  });