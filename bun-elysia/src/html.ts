import { html } from "@elysiajs/html";
import Elysia from "elysia";
import { staticPlugin } from '@elysiajs/static';
const app = new Elysia().use(html());
const products = ['Apple', 'Banana'];
app.get("/", (context) => {
    return `<h1>Hello world</h1>`
});

// app.get("/jsx", () => (
//     <div>
//     { products.map(item) => < h3 > { item } < /h3>}
//     < /div>
// ));

app.listen(3000);



const appTwo = new Elysia().use(staticPlugin({
    assets: `C:/Users/Admin/Desktop/Personal Projects/Journey-With-Bun/bun-elysia/src/public`,
    prefix: "/"
}));

appTwo.get("/", () => Bun.file("C:/Users/Admin/Desktop/Personal Projects/Journey-With-Bun/bun-elysia/src/public/user.html"));


appTwo.listen(3001);