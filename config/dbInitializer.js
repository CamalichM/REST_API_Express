import sqlite3 from 'sqlite3';
import fs from 'fs';

const initializeDatabase = () => {
    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
        db.run(`CREATE TABLE Restaurants (
            id TEXT PRIMARY KEY,
            rating INTEGER CHECK(rating >= 0 AND rating <= 4),
            name TEXT,
            site TEXT,
            email TEXT,
            phone TEXT,
            street TEXT,
            city TEXT,
            state TEXT,
            lat FLOAT,
            lng FLOAT
        )`);

        const jsonData = fs.readFileSync('./db.json');
        const { restaurants } = JSON.parse(jsonData);
        const stmt = db.prepare('INSERT INTO Restaurants VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        restaurants.forEach((restaurant) => {
            stmt.run(
                restaurant.id,
                restaurant.rating,
                restaurant.name,
                restaurant.site,
                restaurant.email,
                restaurant.phone,
                restaurant.street,
                restaurant.city,
                restaurant.state,
                parseFloat(restaurant.lat),
                parseFloat(restaurant.lng)
            );
        });
        stmt.finalize();
    });

    return db;
};

export default initializeDatabase;
