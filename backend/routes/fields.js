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
  let lastOne=req.query['lastOne'];
  let key=req.query['key']; 

  if(lastOne){
    conn.query("SELECT fields.* FROM fields JOIN users ON fields.userId = users.id WHERE users.key = ? ORDER BY fields.id DESC LIMIT 1", [key] , function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send(500);
      }
      else
        res.send(results);
    });
  }
  else{
    conn.query("SELECT fields.* FROM fields JOIN users ON fields.userId = users.id WHERE users.key = ?", [key] , function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send(500);
      }
      else
        res.send(results);
    });
  }
});

//New data
//TODO: Rework this part: 
//        - Non updatable
//        - can't modify just one value
router.post('/', (req, res) => {
  let name=req.query['name'];
  let kind=req.query['kind'];
  let size=req.query['size'];
  let weekly_goal=req.query['weekly_goal'];
  let key=req.query['key']; 

  res.setHeader("Content-Type", "application/json");
  //TODO:Select request to check if it exists
  // conn.query('SELECT fields.* FROM fields JOIN users ON fields.userId = users.id WHERE users.key=?', [key], function(error, firstResult) {

  conn.query('INSERT INTO fields (name, kind, size, userId) VALUES (?,?,?, (SELECT id FROM users WHERE users.key = ?))', [name, kind, size, key], function (error, results, fields) {
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
  let key=req.query['key']; 

  conn.query('DELETE FROM fields WHERE id = ? AND userId = (SELECT id FROM users WHERE users.key = ?)', [id, key], function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else
      res.send(200);
  })
});

module.exports = router;
