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
  let date=new Date(req.query['date']).setHours(0,0,0,0);

  conn.query('SELECT * FROM data WHERE champsId=?', [fieldId], function(error, results, fields) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else{
      if(results.length === 0){ //If champsId doesn't exist
        conn.query('INSERT INTO data (champsId, data, datetime) VALUES (?,?,?)', [fieldId, data, date], function (error, results, fields) {
          if (error) {
            console.log(error);
            res.send(500);
          }
          else
            res.send(200);
        })
      }
      else{ //If champsId exist
        //TODO: Add gestion des jours (if exist for $day)
        let resultDate = new Date(results[0]['datetime']).setHours(0,0,0,0);

        if(date === resultDate){
          
        }
        
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
