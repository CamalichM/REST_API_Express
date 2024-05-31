import restaurantService from '../services/restaurantService.js';

const getAllRestaurants = (req, res) => {
    console.log('Si llegó al controlador de restaurantes');
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
            console.log('Restaurant created successfully');
        }
    });
};

const updateRestaurant = (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
    restaurantService.updateRestaurant(id, updatedData, (err, updatedRestaurant) => {
        if (err) {
            return next(err);
        }
        return res.send('Restaurant updated successfully');
    });
};


const deleteRestaurant = (req, res) => {
    const { id } = req.params;
    restaurantService.deleteRestaurant(id, (err, isDeleted) => {
        if (err) {
            res.status(500).send('Error deleting restaurant');
        } else {
            res.status(204).send();
        }
    });
};

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
