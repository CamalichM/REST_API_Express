import express from 'express';
import bodyParser from 'body-parser';
import restaurantController from './controllers/restaurantController.js';
import fs from 'fs';
import csv from 'csvtojson';
import { initializeDatabase } from './config/dbInitializer.js';

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

app.get("/", (req, res) => {
res.send('API has been initialized');
    });

// Routes for CRUD and statistics operations
app.get('/restaurants/', restaurantController.getAllRestaurants);
app.get('/restaurants/statistics', restaurantController.getStatistics);
app.get('/restaurants/:id', restaurantController.getRestaurantById);
app.post('/restaurants', restaurantController.createRestaurant);
app.put('/restaurants/:id', restaurantController.updateRestaurant);
app.delete('/restaurants/:id', restaurantController.deleteRestaurant);

app.use((err, req, res, next) => {
  if (res.headersSent) {
      return next(err);
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).send({ error: 'Invalid JSON' });
  }
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
