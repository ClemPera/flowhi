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

  // Parse the date properly
  let rawDate = req.query['date'];
  // Force UTC interpretation to avoid timezone issues
  let dateParts = rawDate.split('-');
  let year = parseInt(dateParts[0]);
  let month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JavaScript
  let day = parseInt(dateParts[2]);
  let date = new Date(Date.UTC(year, month, day));
  console.log("Backend received date:", rawDate, "parsed as:", date, "UTC string:", date.toUTCString());

  // Get week start date (Sunday)
  let weekStart = new Date(Date.UTC(year, month, day));
  const dayOfWeek = weekStart.getUTCDay(); // Use UTC day of week
  console.log("Day of week (UTC):", dayOfWeek);
  weekStart.setUTCDate(weekStart.getUTCDate() - dayOfWeek);
  weekStart.setUTCHours(0, 0, 0, 0);
  let weekStartStr = weekStart.toISOString().split("T")[0];
  console.log("Backend calculated weekStart:", weekStartStr, "from date:", date.toISOString());

  console.log("GET goals - fieldId:" + fieldId + " weekStart:" + weekStartStr + " key:" + key);
  conn.query(`SELECT goals.*
    FROM goals
      JOIN fields ON goals.fieldId = fields.id
      JOIN users ON fields.userId = users.id
    WHERE goals.fieldId = ?
      AND goals.weekStartDate = ?
      AND users.key = ?`,
    [fieldId, weekStartStr, key],
    function (error, results) {
      if (error) {
        console.log("Database error:", error);
        res.status(500).send({ error: "Database error" });
      }
      else {
        console.log("Results:", results);
        if (results && results.length > 0) {
          res.send(results[0]);
        } else {
          console.log("No goals found for fieldId:", fieldId, "weekStart:", weekStart);
          res.send(null);
        }
      }
    });
});

router.post('/', (req, res) => {
  let fieldId = req.query['fieldId'];
  let goal = req.query['goal'];
  let key = req.query['key'];

  // Parse the date properly
  let rawDate = req.query['date'];
  // Force UTC interpretation to avoid timezone issues
  let dateParts = rawDate.split('-');
  let year = parseInt(dateParts[0]);
  let month = parseInt(dateParts[1]) - 1; // Month is 0-indexed in JavaScript
  let day = parseInt(dateParts[2]);
  let date = new Date(Date.UTC(year, month, day));
  console.log("Backend received date (POST):", rawDate, "parsed as:", date, "UTC string:", date.toUTCString());

  // Get week start date (Sunday)
  let weekStart = new Date(Date.UTC(year, month, day));
  const dayOfWeek = weekStart.getUTCDay(); // Use UTC day of week
  console.log("Day of week (POST/UTC):", dayOfWeek);
  weekStart.setUTCDate(weekStart.getUTCDate() - dayOfWeek);
  weekStart.setUTCHours(0, 0, 0, 0);
  let weekStartStr = weekStart.toISOString().split("T")[0];
  console.log("Backend calculated weekStart (POST):", weekStartStr, "from date:", date.toISOString());

  console.log("POST goals - fieldId:" + fieldId + " weekStart:" + weekStartStr + " goal:" + goal + " key:" + key);

  // Check if goal exists for this week
  conn.query('SELECT goals.* FROM goals JOIN fields ON goals.fieldId = fields.id JOIN users ON fields.userId = users.id WHERE goals.fieldId=? AND goals.weekStartDate=? AND users.key=?',
    [fieldId, weekStartStr, key],
    function(error, results) {
      if (error) {
        console.log("Database error:", error);
        res.status(500).send({ error: "Database error" });
      }
      else {
        console.log("Check results:", results);
        if(results.length === 0) {
          // Insert new goal
          console.log("Inserting new goal");
          conn.query('INSERT INTO goals (fieldId, weekStartDate, goal) VALUES (?, ?, ?)',
            [fieldId, weekStartStr, goal],
            function (error) {
              if (error) {
                console.log("Insert error:", error);
                res.status(500).send({ error: "Insert error" });
              }
              else {
                console.log("Goal inserted successfully");
                res.status(200).send({ success: true });
              }
            });
        }
        else {
          // Update existing goal
          console.log("Updating existing goal");
          conn.query('UPDATE goals SET goal=? WHERE fieldId=? AND weekStartDate=?',
            [goal, fieldId, weekStartStr],
            function (error) {
              if (error) {
                console.log("Update error:", error);
                res.status(500).send({ error: "Update error" });
              }
              else {
                console.log("Goal updated successfully");
                res.status(200).send({ success: true });
              }
            });
        }
      }
    });
});

module.exports = router;
