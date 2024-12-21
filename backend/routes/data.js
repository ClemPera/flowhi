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
  id=req.query['id'];

  conn.query('SELECT * FROM data WHERE id=?', [id], function (error, results, fields) {
    if (error) 
      res.send(500);
    else
      res.send(results[0]);
  });
});

//New data
router.post('/', (req, res) => {
  champsId=req.query['champsId'];
  data=req.query['data'];
  
  conn.query('INSERT INTO data (champsId, data) VALUES (?,?)', [champsId, data], function (error, results, fields) {
    if (error) {
      console.log(error)
      res.send(500);
    }
    else
      res.send(200);
  })
});

//Update data
router.put('/', (req, res) => {
  id=req.query['id'];
  data=req.query['data'];
  
  conn.query('UPDATE data SET data=? WHERE id=?', [data, id], function (error, results, fields) {
    if (error) 
      res.send(500);
    else
      res.send(200);
  })
});
module.exports = router;
