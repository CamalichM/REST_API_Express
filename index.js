import express from 'express';
import bodyParser from 'body-parser';
import restaurantController from './controllers/restaurantController.js';
import fs from 'fs';
import csv from 'csvtojson';

const app = express();
app.use(bodyParser.json());

let converted = false;

const createData = () => {
    if (!converted && !fs.existsSync('./db.json')) {
        csv()
            .fromFile('./files/restaurantes.csv')
            .then((data) => {
                const jsonData = { restaurants: data };
                fs.writeFileSync('./db.json', JSON.stringify(jsonData, null, 2));
                console.log('Data successfully converted and saved to db.json');
                converted = true;
            })
            .catch((err) => {
                console.error('Error converting data:', err);
            });
    }
};
createData();

const readData = () => {
  const db = initializeDatabase(); 
  return new Promise((resolve, reject) => {
      db.all('SELECT * FROM Restaurants', (err, rows) => {
          if (err) {
              console.error('Error reading data:', err);
              reject(err);
          } else {
              resolve({ restaurants: rows });
          }
      });
  });
};

app.get("/", (req, res) => {
    const data = readData();
    if (data) {
        res.json(data);
    } else {
        res.status(500).send('Error reading data');
    }
});

// Routes for CRUD and statistics operations
app.get('/restaurants', restaurantController.getAllRestaurants);
app.get('/restaurants/:id', restaurantController.getRestaurantById);
app.post('/restaurants', restaurantController.createRestaurant);
app.put('/restaurants/:id', restaurantController.updateRestaurant);
app.delete('/restaurants/:id', restaurantController.deleteRestaurant);
app.get('/restaurants/statistics', restaurantController.getStatistics);

app.use((err, req, res, next) => {
  if (res.headersSent) {
      return next(err);
  }
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
