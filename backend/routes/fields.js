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
    conn.query(`SELECT fields.* FROM fields 
      JOIN users ON fields.userId = users.id 
      WHERE users.key = ? ORDER BY fields.id DESC LIMIT 1`, 
      [key], function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send(500);
      }
      else
        res.send(results);
    });
  }
  else{
    conn.query(`SELECT fields.* FROM fields 
        JOIN users ON fields.userId = users.id 
        WHERE users.key = ?`, [key] , 
      function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send(500);
      }
      else
        res.send(results);
    });
  }
});

router.post('/', (req, res) => {
  let name=req.query['name'];
  let kind=req.query['kind'];
  let size=req.query['size'];
  let goal_weekly=req.query['goal_weekly'];
  let key=req.query['key']; 

  res.setHeader("Content-Type", "application/json");
  conn.query(`INSERT INTO fields (name, kind, size, goal_weekly, userId) 
      VALUES (?,?,?,?, (SELECT id FROM users 
      WHERE users.key = ?))`
      , [name, kind, size, goal_weekly, key], function (error, results, fields) {
    if (error) {
      console.log(error);
      res.send(500);
    }
    else
      res.send(200);
  })
});

router.put('/', (req, res) => {
  let fieldsId = req.query['id'];
  let name = req.query['name'];
  let kind = req.query['kind'];
  let size = req.query['size'];
  let goal_weekly = req.query['goal_weekly'];
  let key = req.query['key'];
  
  res.setHeader("Content-Type", "application/json");
  
  // First verify the user owns this field
  conn.query(`SELECT f.id FROM fields f 
              JOIN users u ON f.userId = u.id 
              WHERE f.id = ? AND u.key = ?`, 
              [fieldsId, key], 
  function(error, results) {
    if (error) {
      console.log(error);
      return res.status(500).json({error: "Database error"});
    }
    
    if (results.length === 0) {
      return res.status(404).json({error: "Field not found or unauthorized"});
    }
    
    // Build dynamic UPDATE query based on provided parameters
    let updateFields = [];
    let updateValues = [];
    
    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (kind !== undefined) {
      updateFields.push('kind = ?');
      updateValues.push(kind);
    }
    if (size !== undefined) {
      updateFields.push('size = ?');
      updateValues.push(size);
    }
    if (goal_weekly !== undefined) {
      updateFields.push('goal_weekly = ?');
      updateValues.push(goal_weekly);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({error: "No fields to update"});
    }
    
    // Add fieldsId to the end of values array for WHERE clause
    updateValues.push(fieldsId);
    
    const updateQuery = `UPDATE fields SET ${updateFields.join(', ')} WHERE id = ?`;
    
    conn.query(updateQuery, updateValues, function(error, results) {
      if (error) {
          console.log(error);
          res.status(500).json({error: "Update failed"});
      } else {
          res.status(200).json({message: "Field updated successfully"});
      }
    });
  });
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
