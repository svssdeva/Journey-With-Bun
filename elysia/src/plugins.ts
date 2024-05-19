import { Elysia } from "elysia";

const plugins = (app: Elysia) => {
    return app.group("/products", (app) =>
        app
            .get("/apple", (context) => 'Hello Apple')
            .get("/banana", (context) => 'Hello Banana')
    );
}


export default plugins;