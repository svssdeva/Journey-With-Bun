import express, { type Request, type Response } from "express";
import userRoutes from './users';
const app = express();

const PORT = 2000;
const data = {
    pCode: 1000,
    pName: 'Apple',
    price: 20
}
app.get('/', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});

app.get('/products*', (req: Request, res: Response) => {
    //wildcard routes + * ? //
    res.setHeader('Content-Type', 'text/html');
    res.send(`<h1>Hello Products Route!</h1> <br> <h2>Url: ${req.url}</h2> `);
});

app.get('/users/:userId/:userName', (req: Request, res: Response) => {
    //params
    res.setHeader('Content-Type', 'text/html');
    res.write('<html> <head> <title>Bun + Express</title></head>');
    res.write(`<body> <h2>UserId: ${req.params.userId}</h2> <br> <h2>UserName: ${req.params.userName}</h2> </body>`);
    res.write('</html>');
    res.end();
});

app.use('/users', userRoutes);



app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})