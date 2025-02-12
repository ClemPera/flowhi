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
  let date=new Date(req.query['date']).toISOString().split("T")[0];

  conn.query("SELECT * FROM data WHERE champsId=? AND datetime=?", [id, date], function (error, results) {
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
  let date=new Date(req.query['date']).toISOString().split("T")[0];

  conn.query('SELECT * FROM data WHERE champsId=?', [fieldId], function(error, results) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else{
      //TODO: Gérer ça mieux pour pas dupliquer les lignes de code

      if(results.length === 0){ //If champsId doesn't exist
        conn.query('INSERT INTO data (champsId, data, datetime) VALUES (?,?,?)', [fieldId, data, date], function (error) {
          if (error) {
            console.log(error);
            res.send(500);
          }
          else
            res.send(200);
        })
      }
      else{ //If champsId exist
        let resultDate = new Date(results[0]['datetime']);

        if(date === resultDate){
          conn.query('UPDATE data SET data=? WHERE champsId=?', [data, fieldId], function (error) {
            if (error) {
              console.log(error);
              res.send(500);
            }
            else
              res.send(200);
          })

          //TODO: quit when found
        }
        else{
          conn.query('INSERT INTO data (champsId, data, datetime) VALUES (?,?,?)', [fieldId, data, date], function (error) {
            if (error) {
              console.log(error);
              res.send(500);
            }
            else
              res.send(200);
          })
        }
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
