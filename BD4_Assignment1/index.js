const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

const db = new sqlite3.Database('./database.sqlite');

app.use(express.json());

//Exercise 1: Get All Restaurants

app.get('/restaurants', (req, res) => {
  db.all('SELECT * FROM restaurants', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ restaurants: rows });
  });
});

//Exercise 2: Get Restaurant by ID
app.get('/restaurants/details/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM restaurants WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ restaurant: row });
  });
});

//Exercise 3: Get Restaurants by Cuisine
app.get('/restaurants/cuisine/:cuisine', (req, res) => {
  const cuisine = req.params.cuisine;
  db.all(
    'SELECT * FROM restaurants WHERE cuisine = ?',
    [cuisine],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ restaurants: rows });
    }
  );
});

//Exercise 4: Get Restaurants by Filter

app.get('/restaurants/filter', (req, res) => {
  const { isVeg, hasOutdoorSeating, isLuxury } = req.query;
  let query = 'SELECT * FROM restaurants WHERE 1=1';
  const params = [];

  if (isVeg) {
    query += ' AND isVeg = ?';
    params.push(isVeg);
  }
  if (hasOutdoorSeating) {
    query += ' AND hasOutdoorSeating = ?';
    params.push(hasOutdoorSeating);
  }
  if (isLuxury) {
    query += ' AND isLuxury = ?';
    params.push(isLuxury);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ restaurants: rows });
  });
});

//Exercise 5: Get Restaurants Sorted by Rating
app.get('/restaurants/sort-by-rating', (req, res) => {
  db.all('SELECT * FROM restaurants ORDER BY rating DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ restaurants: rows });
  });
});

//Exercise 6: Get All Dishes
app.get('/dishes', (req, res) => {
  db.all('SELECT * FROM dishes', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ dishes: rows });
  });
});

//Exercise 7: Get Dish by ID

app.get('/dishes/details/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM dishes WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ dish: row });
  });
});

//Exercise 8: Get Dishes by Filter
app.get('/dishes/filter', (req, res) => {
  const { isVeg } = req.query;
  let query = 'SELECT * FROM dishes WHERE 1=1';
  const params = [];

  if (isVeg) {
    query += ' AND isVeg = ?';
    params.push(isVeg);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ dishes: rows });
  });
});

//Exercise 9: Get Dishes Sorted by Price

app.get('/dishes/sort-by-price', (req, res) => {
  db.all('SELECT * FROM dishes ORDER BY price ASC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ dishes: rows });
  });
});

module.exports = app;
