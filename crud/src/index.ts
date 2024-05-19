import {Elysia} from "elysia";
import {html} from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import {fileURLToPath} from 'url'
import {Product, ProductDatabase} from "./db";

const __dirname = fileURLToPath(new URL('..', import.meta.url))
const VIEWS_PATH = `${__dirname}\\public\\views`.replaceAll('/', '\\');
const SRC_PATH = `${__dirname}\src`;
const HOME = Bun.file(VIEWS_PATH + "\\home.html");
const ADD_PRODUCTS = Bun.file(VIEWS_PATH + "\\add-product.html");
const EDIT = Bun.file(VIEWS_PATH + "\\edit-product.html");
const SCRIPT = Bun.file(SRC_PATH + "\\script.js");
console.log(SCRIPT);
const app = new Elysia()
    .use(html())
    .use(staticPlugin({prefix: '/'}))
    .decorate("db", new ProductDatabase())
    .get('/script.js', () => SCRIPT.text())
    .get('/fetch-products', ({db}) => db.fetchProducts())
    .get("/", () => HOME)
    .get("/add-product", () => ADD_PRODUCTS)
    .post('/add-product', ({db, body, set}) => {
        db.addProduct(<Product>body);
        set.redirect = '/';
    })
    .post('/edit/:id', ({db, body, set, params}) => {
        db.updateProduct(+params.id, <Product>body);
        set.redirect = '/';
    })
    .get('/edit/:id', () => EDIT)
    .get('/delete/:id', ({db, set, params}) => {
        db.deleteProduct(+params.id);
        set.redirect = '/';
    })
    .listen(3000);
console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
