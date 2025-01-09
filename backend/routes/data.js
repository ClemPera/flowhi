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
  let id=req.query['id'];

  conn.query('SELECT * FROM data WHERE id=?', [id], function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else
      res.send(results[0]);
  });
});

//New data
router.post('/', (req, res) => {
  let fieldId=req.query['fieldId'];
  let data=req.query['data'];
  // console.log("fieldId: " + fieldId + " data: " + data);
  conn.query('SELECT * FROM data WHERE champsId=?', [fieldId], function(error, results, fields) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else{
      if(results.length === 0){ //If doesn't exist
        conn.query('INSERT INTO data (champsId, data) VALUES (?,?)', [fieldId, data], function (error, results, fields) {
          if (error) {
            console.log(error);
            res.send(500);
          }
          else
            res.send(200);
        })
      }
      else{ //If exist
        conn.query('UPDATE data SET data=? WHERE champsId=?', [data, fieldId], function (error, results, fields) {
          if (error) {
            console.log(error);
            res.send(500);
          }
          else
            res.send(200);
        })
      }
    }
  });
});

//Update data
router.put('/', (req, res) => {
  let fieldId=req.query['fieldId'];
  let data=req.query['data'];

});
module.exports = router;
