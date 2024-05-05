import Database from "bun:sqlite";

export class ProductDatabase {
    private db: Database;

    constructor() {
        this.db = new Database("Products.sqlite");
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error);
    }

    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price INTEGER, image TEXT)')
    }
}