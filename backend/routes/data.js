require('dotenv').config()
var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MARIADB_PASSWORD,
  database: "wellbeing"
});

conn.connect();

router.get('/', function(req, res) {
  let id=req.query['fieldId'];

  conn.query('SELECT * FROM data WHERE champsId=?', [id], function (error, results, fields) {
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
        //Add gestion des jours (if exist for $day)
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
