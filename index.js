var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'fullstack'
});


var app = express()
app.use(cors())
app.use(express.json())
app.get('/student', function (req, res, next) {
    connection.query(
      'SELECT * FROM `student`',
      function(err, results, fields) {
        res.json(results);
      }
    );
  }),
app.post('/student', function (req, res, next) {
    connection.query(
      'INSERT INTO `student`(`sname`, `lname`) VALUES (?, ?)',
      [req.body.sname, req.body.lname],
      function(err, results) {
        res.json(results);
      }
    );
  }),
app.put('/student', function (req, res, next) {
    connection.query(
      'UPDATE `student` SET `sname`= ?, `lname`= ?, WHERE id = ?',
      [req.body.sname, req.body.lname ,req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  }),
  app.delete('/student', function (req, res, next) {
    connection.query(
      'DELETE FROM `student` WHERE id = ?',
      [req.body.id],
      function(err, results) {
        res.json(results);
      }
    );
  })

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})