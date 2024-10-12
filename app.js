const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL username
  password: 'root',  // Your MySQL password
  database: 'car_showroom'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Get All Cars
app.get('/cars', (req, res) => {
  const sql = 'SELECT * FROM cars';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Add a Car
app.post('/cars', (req, res) => {
  const { brand, model, year, price, engine, horsepower, fuel_type, transmission, color, seats, mileage, torque, safety_rating, air_conditioning, bluetooth, navigation, image_url } = req.body;

  const sql = `INSERT INTO cars (brand, model, year, price, engine, horsepower, fuel_type, transmission, color, seats, mileage, torque, safety_rating, air_conditioning, bluetooth, navigation, image_url) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [brand, model, year, price, engine, horsepower, fuel_type, transmission, color, seats, mileage, torque, safety_rating, air_conditioning, bluetooth, navigation, image_url];

  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send('Car added successfully!');
  });
});

// Get a single car by ID
app.get('/cars/:id', (req, res) => {
  const sql = `SELECT * FROM cars WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Update Car Details
app.put('/cars/:id', (req, res) => {
  const { brand, model, year, price, engine, horsepower, fuel_type, transmission, color, seats, mileage, torque, safety_rating, air_conditioning, bluetooth, navigation, image_url } = req.body;

  const sql = `UPDATE cars SET brand = ?, model = ?, year = ?, price = ?, engine = ?, horsepower = ?, fuel_type = ?, transmission = ?, color = ?, seats = ?, mileage = ?, torque = ?, safety_rating = ?, air_conditioning = ?, bluetooth = ?, navigation = ?, image_url = ? WHERE id = ?`;

  const values = [brand, model, year, price, engine, horsepower, fuel_type, transmission, color, seats, mileage, torque, safety_rating, air_conditioning, bluetooth, navigation, image_url, req.params.id];

  db.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send('Car updated successfully!');
  });
});

// Delete a Car
app.delete('/cars/:id', (req, res) => {
  const sql = 'DELETE FROM cars WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send('Car deleted successfully!');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
