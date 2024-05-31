import restaurantService from '../services/restaurantService.js';

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

const getStatistics = (req, res) => {
    const { latitude, longitude, radius } = req.query;
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    console.log('Radius:', radius);

    const query = `
        SELECT COUNT(*) AS count,
               AVG(rating) AS avg,
               IFNULL(SQRT(AVG(POWER(rating - AVG(rating), 2))), 0) AS std
        FROM Restaurants
        WHERE
            (6371000 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lng) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) <= ?
    `;

    const params = [latitude, longitude, latitude, radius];

    db.get(query, params, (err, result) => {
        if (err) {
            console.error('Error retrieving statistics:', err);
            res.status(500).send('Error retrieving statistics');
            return;
        }

        res.json({
            count: result.count || 0,
            avg: result.avg || 0,
            std: result.std || 0
        });
    });
};




const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; 
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
};




export default {
    getAllRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getStatistics
};
