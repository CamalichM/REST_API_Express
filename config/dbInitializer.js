import sqlite3 from 'sqlite3';

/**
 * Initializes the SQLite database.
 * @returns {sqlite3.Database} The initialized database instance.
 */
const initializeDatabase = () => {
    // Create a new database instance
    const db = new sqlite3.Database('./restaurantes.db');

    // Serialize database operations
    db.serialize(() => {
        // Check if the 'Restaurants' table exists
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Restaurants'", (err, row) => {
            if (err) {
                console.error('Error checking table existence:', err);
                return;
            }
            if (!row) {
                // If the table doesn't exist, create it
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
