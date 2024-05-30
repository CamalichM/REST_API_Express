import restaurantService from '../services/restaurantService.js';
import { getDistance } from 'geolib';

const getAllRestaurants = (req, res) => {
    restaurantService.getAllRestaurants((err, restaurants) => {
        if (err) {
            res.status(500).send('Error retrieving restaurants');
        } else {
            res.json(restaurants);
        }
    });
};

const getRestaurantById = (req, res) => {
    const { id } = req.params;
    restaurantService.getRestaurantById(id, (err, restaurant) => {
        if (err) {
            res.status(500).send('Error retrieving restaurant');
        } else if (!restaurant) {
            res.status(404).send('Restaurant not found');
        } else {
            res.json(restaurant);
        }
    });
};

const createRestaurant = (req, res) => {
    const newRestaurant = req.body;
    restaurantService.createRestaurant(newRestaurant, (err, createdRestaurant) => {
        if (err) {
            res.status(500).send('Error creating restaurant');
        } else {
            res.status(201).json(createdRestaurant);
        }
    });
};

const updateRestaurant = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    restaurantService.updateRestaurant(id, updatedData, (err, updatedRestaurant) => {
        if (err) {
            res.status(500).send('Error updating restaurant');
        } else if (!updatedRestaurant) {
            res.status(404).send('Restaurant not found');
        } else {
            res.json(updatedRestaurant);
        }
    });
};

const deleteRestaurant = (req, res) => {
    const { id } = req.params;
    restaurantService.deleteRestaurant(id, (err, isDeleted) => {
        if (err) {
            res.status(500).send('Error deleting restaurant');
        } else if (!isDeleted) {
            res.status(404).send('Restaurant not found');
        } else {
            res.status(204).send();
        }
    });
};

const getStatistics = (req, res) => {
    const { latitude, longitude, radius } = req.query;
    const restaurants = readData().restaurants;

    const restaurantsInRadius = restaurants.filter(restaurant => {
        const distance = getDistance(
            { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
            { latitude: parseFloat(restaurant.lat), longitude: parseFloat(restaurant.lng) }
        );
        return distance <= parseFloat(radius);
    });

    if (restaurantsInRadius.length > 0) {
        const count = restaurantsInRadius.length;
        const ratings = restaurantsInRadius.map(restaurant => parseFloat(restaurant.rating));
        const avg = ratings.reduce((a, b) => a + b, 0) / count || 0;
        const std = Math.sqrt(ratings.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / count) || 0;

        res.json({
            count,
            avg,
            std
        });
    } else {
        res.status(404).send('No restaurants found within the specified radius');
    }
};


export default {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getStatistics
};
