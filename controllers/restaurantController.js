import restaurantService from '../services/restaurantService.js';

/**
 * Retrieves all restaurants.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getAllRestaurants = (req, res) => {
    restaurantService.getAllRestaurants((err, restaurants) => {
        if (err) {
            res.status(500).send('Error retrieving restaurants');
        } else {
            res.json(restaurants);
        }
    });
};

/**
 * Retrieves a restaurant by its ID.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getRestaurantById = (req, res) => {
    const { id } = req.params;
    restaurantService.getRestaurantById(id, (err, restaurant) => {
        if (err) {
            res.status(500).send('Error retrieving restaurant');
        } else {
            res.json(restaurant);
        }
    });
};

/**
 * Creates a new restaurant.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const createRestaurant = (req, res) => {
    const newRestaurant = req.body;
    restaurantService.createRestaurant(newRestaurant, (err, createdRestaurant) => {
        if (err) {
            res.status(500).send('Error creating restaurant');
        } else {
            res.status(201).send('Restaurant has been created!');
        }
    });
};

/**
 * Updates a restaurant.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const updateRestaurant = (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    restaurantService.updateRestaurant(id, updatedData, (err, { updatedRestaurant, message }) => {
        if (err) {
            return next(err);
        }
        return res.json({ updatedRestaurant, message });
    });
};

/**
 * Deletes a restaurant.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const deleteRestaurant = (req, res) => {
    const { id } = req.params;
    restaurantService.deleteRestaurant(id, (err, isDeleted) => {
        if (err) {
            res.status(500).send('Error deleting restaurant');
        } else {
            res.status(204).send('Restaurant has been deleted!');
        }
    });
};

/**
 * Retrieves statistics for restaurants within a certain radius.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const getStatistics = async (req, res, next) => {
    const { latitude, longitude, radius } = req.query;
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const rad = parseFloat(radius);

    if (isNaN(lat) || isNaN(lng) || isNaN(rad) || rad <= 0) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    try {
        restaurantService.getStatistics(lat, lng, rad, (err, { count, avg, std }) => {
            if (err) {
                return res.status(500).json({ error: 'Error getting statistics' });
            }
            res.json({ count, avg, std });
        });
    } catch (err) {
        next(err);
    }
};

export default {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getStatistics,
};
