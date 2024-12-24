var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Seven*Subway*Jinn*Poseidon",
  database: "wellbeing"
});

conn.connect();

router.get('/', function(req, res) {
  conn.query('SELECT * FROM fields', function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else
      res.send(results);
  });
});

//New data
router.post('/', (req, res) => {
  let name=req.query['name'];
  let kind=req.query['kind'];2
  res.setHeader("Content-Type", "application/json");
  
  conn.query('INSERT INTO fields (name, kind) VALUES (?,?)', [name, kind], function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else
      res.send(200);
  })
});

router.delete('/', (req, res) => {
  let id=req.query['id'];
  
  conn.query('DELETE FROM fields WHERE id=?', [id], function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else
      res.send(200);
  })
});

module.exports = router;
