import { Elysia } from "elysia";
import plugins from './plugins';
const app = new Elysia();


app.use(plugins).get("/", (context: any) => {
  console.log(context);
  return 'Hloo Elysia'
});
app.post("/", (context) => {
  return context.request.method;
});

app.all("*", (context) => {
  //default response for all request types
  return 'Response for all routes'
});

app.get("/products/:productId/:productName", (context) => {
  return context.params;
});

app.group("/users", (app) => {
  return app.get("/:userId/:userName", (context) => {
    return context.params;
  });
});




app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
