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

    addProduct(product: Product) {
        return this.db.query('INSERT INTO products (name, price, image) VALUES (?, ?, ?) RETURNING id').get(product.name, product.price, product.image) as Promise<Product>;
    }
}

export interface Product {
    id?: number;
    name: string;
    price: number;
    image: string;
}