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

export const getRestaurantsWithinRadius = (latitude, longitude, radius) => {
    const restaurants = getAllRestaurants();
    const restaurantsInRadius = restaurants.filter(restaurant => {
        const distance = getDistance(
            { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
            { latitude: parseFloat(restaurant.lat), longitude: parseFloat(restaurant.lng) }
        );
        return distance <= parseFloat(radius);
    });
    return restaurantsInRadius;
};

export default { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant, getRestaurantsWithinRadius };
