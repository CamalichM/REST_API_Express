import sqlite3 from 'sqlite3';
import fs from 'fs';

const initializeDatabase = () => {
    const db = new sqlite3.Database('./restaurantes.db');
    db.serialize(() => {
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Restaurants'", (err, row) => {
            if (err) {
                console.error('Error checking table existence:', err);
                return;
            }
            if (!row) {
                // La tabla no existe, así que la creamos
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
            }
        });
    });
    return db;
};

export { initializeDatabase };


