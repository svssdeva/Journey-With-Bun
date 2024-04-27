import express, { type Request, type Response } from "express";
const app = express();

const file = Bun.file('./post.html');

const port = 2000;

//for middleware
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
    res.send(await file.text());
});

app.post('/data', async (req: Request, res: Response) => {
    res.send(req.method + ': Request recieved');
    console.log(req.body);
})

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})