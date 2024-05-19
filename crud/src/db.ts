import Database from "bun:sqlite";

export class ProductDatabase {
    private db: Database;

    constructor() {
        this.db = new Database("Products.sqlite");
        this.init()
            .then(() => console.log('Database initialized'))
            .catch(console.error);
    }

    addProduct(product: Product) {
        return this.db.query(
            `INSERT INTO products(name, price, image) VALUES(?,?,?) RETURNING id`
        ).get(product.name, product.price, product.image) as Product;
    }

    async init() {
        return this.db.run(
            'CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUM, image TEXT)'
        )
    }

    fetchProducts() {
        return this.db.query('SELECT * FROM products').all();
    }

    updateProduct(id: number, product: Product) {
        return this.db.run(`UPDATE products SET name = ${product.name}, price = ${product.name}, image = ${product.name} WHERE id = ${id}`);
    }

    deleteProduct(id: number) {
        return this.db.run(`DELETE FROM products WHERE id = ${id}`);
    }
}

export interface Product {
    id?: number;
    name: string;
    price: number;
    image: string;
}