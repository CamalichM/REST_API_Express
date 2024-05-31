import { initializeDatabase } from '../config/dbInitializer.js';

// Initialize the database
const db = initializeDatabase();

/**
 * Retrieves all restaurants from the database.
 * @param {function} callback - The callback function to be called with the result.
 */
const getAllRestaurants = (callback) => {
    db.all('SELECT * FROM Restaurants', callback);
};

/**
 * Retrieves a restaurant by its ID from the database.
 * @param {string} id - The ID of the restaurant.
 * @param {function} callback - The callback function to be called with the result.
 */
const getRestaurantById = (id, callback) => {
    db.get('SELECT * FROM Restaurants WHERE id = ?', [id], callback);
};

/**
 * Creates a new restaurant in the database.
 * @param {object} restaurant - The restaurant object to be created.
 * @param {function} callback - The callback function to be called with the result.
 */
const createRestaurant = (restaurant, callback) => {
    const { id, rating, name, site, email, phone, street, city, state, lat, lng } = restaurant;
    db.run('INSERT INTO Restaurants (id, rating, name, site, email, phone, street, city, state, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, rating, name, site, email, phone, street, city, state, lat, lng], callback);
};

/**
 * Updates a restaurant in the database.
 * @param {string} id - The ID of the restaurant to be updated.
 * @param {object} restaurant - The updated restaurant object.
 * @param {function} callback - The callback function to be called with the result.
 */
const updateRestaurant = (id, restaurant, callback) => {
    let updateFields = [];
    let updateValues = [];
    Object.keys(restaurant).forEach(key => {
        if (key !== 'id') {
            let value = restaurant[key];
            if (key === 'rating' && typeof value === 'number') {
                value = Math.round(value);
                if (value < 0 || value > 4) {
                    const err = new Error('Rating must be between 0 and 4');
                    return callback(err);
                }
            }
            updateFields.push(`${key} = ?`);
            updateValues.push(value);
        }
    });

    updateValues.push(id);
    const updateQuery = `UPDATE Restaurants SET ${updateFields.join(', ')} WHERE id = ?`;
    db.run(updateQuery, updateValues, callback);
};

/**
 * Deletes a restaurant from the database.
 * @param {string} id - The ID of the restaurant to be deleted.
 * @param {function} callback - The callback function to be called with the result.
 */
const deleteRestaurant = (id, callback) => {
    db.run('DELETE FROM Restaurants WHERE id = ?', [id], callback);
};

export default { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant };
