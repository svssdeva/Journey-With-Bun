import {Elysia} from "elysia";
import {html} from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import {fileURLToPath} from 'url'
import {Product, ProductDatabase} from "./db";

const __dirname = fileURLToPath(new URL('..', import.meta.url))
const VIEWS_PATH = `${__dirname}\\public\\views`.replaceAll('/', '\\');
const HOME = Bun.file(VIEWS_PATH + "\\home.html");
const ADD_PRODUCTS = Bun.file(VIEWS_PATH + "\\add-product.html");
const EDIT = Bun.file(VIEWS_PATH + "\\edit-product.html");

const app = new Elysia()
    .use(html())
    .use(staticPlugin({prefix: '/'}))
    .decorate("db", new ProductDatabase())
    .get("/", () => HOME)
    .get("/add-product", () => ADD_PRODUCTS)
    .post('/add-product', ({db, body, set}) => {
        db.addProduct(<Product>body);
        set.redirect("/");
    })
    .get('/edit', () => EDIT)
    .listen(3000);
console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
