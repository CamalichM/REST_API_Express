import restaurantModel from '../models/restaurantModel.js';
import { getDistance } from 'geolib';

/**
 * Retrieves all restaurants from the database.
 * @param {function} callback - The callback function to be called with the result.
 */
const getAllRestaurants = (callback) => {
    restaurantModel.getAllRestaurants(callback);
};

/**
 * Retrieves a restaurant by its ID from the database.
 * @param {string} id - The ID of the restaurant.
 * @param {function} callback - The callback function to be called with the result.
 */
const getRestaurantById = (id, callback) => {
    restaurantModel.getRestaurantById(id, callback);
};

/**
 * Creates a new restaurant in the database.
 * @param {object} restaurant - The restaurant object to be created.
 * @param {function} callback - The callback function to be called with the result.
 */
const createRestaurant = (restaurant, callback) => {
    restaurantModel.createRestaurant(restaurant, callback);
};

/**
 * Updates a restaurant in the database.
 * @param {string} id - The ID of the restaurant to be updated.
 * @param {object} restaurant - The updated restaurant object.
 * @param {function} callback - The callback function to be called with the result.
 */
const updateRestaurant = (id, restaurant, callback) => {
    restaurantModel.updateRestaurant(id, restaurant, (err, result) => {
        if (err) {
            return callback(err);
        }
        if (result === 0) {
            const err = new Error('Restaurant not found');
            return callback(err);
        }
        getRestaurantById(id, (err, updatedRestaurant) => {
            if (err) {
                return callback(err);
            }
            callback(null, { updatedRestaurant, message: 'Restaurant updated successfully' });
        });
    });
};

/**
 * Deletes a restaurant from the database.
 * @param {string} id - The ID of the restaurant to be deleted.
 * @param {function} callback - The callback function to be called with the result.
 */
const deleteRestaurant = (id, callback) => {
    restaurantModel.deleteRestaurant(id, callback);
};

/**
 * Retrieves statistics about restaurants within a certain radius of a given location.
 * @param {number} latitude - The latitude of the center point.
 * @param {number} longitude - The longitude of the center point.
 * @param {number} radius - The radius in meters.
 * @param {function} callback - The callback function to be called with the result.
 */
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
