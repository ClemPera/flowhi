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
  let fieldId = req.query['fieldId'];
  let key = req.query['key'];
  let date = new Date(req.query['date']).toISOString().split("T")[0];

  // Get week start date
  let weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  weekStart = weekStart.toISOString().split("T")[0];

  conn.query("SELECT goals.* FROM goals JOIN fields ON goals.fieldId = fields.id JOIN users ON fields.userId = users.id WHERE goals.fieldId=? AND goals.weekStartDate=? AND users.key=?",
    [fieldId, weekStart, key],
    function (error, results) {
      if (error) {
        console.log(error);
        res.send(500);
      }
      else
        res.send(results[0]);
    });
});

router.post('/', (req, res) => {
  let fieldId = req.query['fieldId'];
  let goal = req.query['goal'];
  let key = req.query['key'];
  let date = new Date(req.query['date']).toISOString().split("T")[0];

  // Get week start date
  let weekStart = new Date(date);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  weekStart = weekStart.toISOString().split("T")[0];

  // Check if goal exists for this week
  conn.query('SELECT goals.* FROM goals JOIN fields ON goals.fieldId = fields.id JOIN users ON fields.userId = users.id WHERE goals.fieldId=? AND goals.weekStartDate=? AND users.key=?',
    [fieldId, weekStart, key],
    function(error, results) {
      if (error) {
        console.log(error);
        res.send(500);
      }
      else {
        if(results.length === 0) {
          // Insert new goal
          conn.query('INSERT INTO goals (fieldId, weekStartDate, goal) VALUES (?, ?, ?)',
            [fieldId, weekStart, goal],
            function (error) {
              if (error) {
                console.log(error);
                res.send(500);
              }
              else
                res.send(200);
            });
        }
        else {
          // Update existing goal
          conn.query('UPDATE goals SET goal=? WHERE fieldId=? AND weekStartDate=?',
            [goal, fieldId, weekStart],
            function (error) {
              if (error) {
                console.log(error);
                res.send(500);
              }
              else
                res.send(200);
            });
        }
      }
    });
});

module.exports = router;
