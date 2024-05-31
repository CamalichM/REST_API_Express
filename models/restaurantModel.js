import { initializeDatabase } from '../config/dbInitializer.js';

const db = initializeDatabase();

const getAllRestaurants = (callback) => {
    db.all('SELECT * FROM Restaurants', callback);
};

const getRestaurantById = (id, callback) => {
    db.get('SELECT * FROM Restaurants WHERE id = ?', [id], callback);
};

const createRestaurant = (restaurant, callback) => {
    const { id, rating, name, site, email, phone, street, city, state, lat, lng } = restaurant;
    db.run('INSERT INTO Restaurants (id, rating, name, site, email, phone, street, city, state, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, rating, name, site, email, phone, street, city, state, lat, lng], callback);
};

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

const deleteRestaurant = (id, callback) => {
    db.run('DELETE FROM Restaurants WHERE id = ?', [id], callback);
};

export default { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant };
