import restaurantModel from '../models/restaurantModel.js';
import { getDistance } from 'geolib';

const getAllRestaurants = (callback) => {
    restaurantModel.getAllRestaurants(callback);
};

const getRestaurantById = (id, callback) => {
    restaurantModel.getRestaurantById(id, callback);
};

const createRestaurant = (restaurant, callback) => {
    restaurantModel.createRestaurant(restaurant, callback);
};

const updateRestaurant = (id, restaurant, callback) => {
    restaurantModel.updateRestaurant(id, restaurant, callback);
};

const deleteRestaurant = (id, callback) => {
    restaurantModel.deleteRestaurant(id, callback);
};
const getStatistics = (latitude, longitude, radius, callback) => {
    restaurantModel.getAllRestaurants((err, restaurants) => {
        if (err) {
            return callback(err);
        }

        const filteredRestaurants = restaurants.filter(restaurant => {
            const distance = getDistance(
                { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
                { latitude: parseFloat(restaurant.lat), longitude: parseFloat(restaurant.lng) }
            );
            return distance <= parseFloat(radius);
        });

        const count = filteredRestaurants.length;
        const ratings = filteredRestaurants.map(restaurant => parseFloat(restaurant.rating));
        const avg = count > 0 ? ratings.reduce((a, b) => a + b, 0) / count : 0;
        const std = count > 0 ? Math.sqrt(ratings.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / count) : 0;

        callback(null, { count, avg, std });
    });
};




export default { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant, getStatistics };
