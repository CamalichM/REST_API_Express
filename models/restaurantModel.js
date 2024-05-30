import initializeDatabase from '../config/dbInitializer.js';

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
    const { rating, name, site, email, phone, street, city, state, lat, lng } = restaurant;
    db.run('UPDATE Restaurants SET rating = ?, name = ?, site = ?, email = ?, phone = ?, street = ?, city = ?, state = ?, lat = ?, lng WHERE id = ?',
        [rating, name, site, email, phone, street, city, state, lat, lng, id], callback);
};

const deleteRestaurant = (id, callback) => {
    db.run('DELETE FROM Restaurants WHERE id = ?', [id], callback);
};

export default { getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant };
