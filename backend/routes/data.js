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
  let key=req.query['key'];
  let date=new Date(req.query['date']).toISOString().split("T")[0];

  conn.query("SELECT data.* FROM data JOIN fields ON data.champsId = fields.id JOIN users ON fields.userId = users.id WHERE data.champsId=? AND data.datetime=? AND users.key=?", [id, date, key], function (error, results) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else
      res.send(results[0]);
  });
});

//New data

//TODO: ---------TO FIX---------
//TODO: checker la clée avant d'insert ou d'update
router.post('/', (req, res) => {
  let fieldId=req.query['fieldId'];
  let data=req.query['data'];
  // let key=req.query['key'];
  let key="toto";
  let date=new Date(req.query['date']).toISOString().split("T")[0];

  //Key check
  conn.query('SELECT fields.* JOIN users ON fields.userId = users.id WHERE users.key=?', [key], function(error, results) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else if(result.length === 0){
      console.log("Unauthorized");
      res.send(401);
    }
    else{
      conn.query('SELECT data.* FROM data JOIN fields ON data.champsId = fields.id JOIN users ON fields.userId = users.id WHERE data.champsId=? AND data.datetime=? AND users.key=?', [fieldId,date,key], function(error, results) {
        if (error) {
          console.log(error);
          res.send(500);
        }
        else{
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
            conn.query('UPDATE data SET data=? WHERE champsId=? AND datetime=?', [data,fieldId,date], function (error) {
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
    }
  });
});

module.exports = router;
