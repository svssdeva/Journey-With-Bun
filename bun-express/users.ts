import express, { type Request, type Response } from "express";
import path from 'path';
const usersRouter = express.Router();

const meta = import.meta; //send file


usersRouter.get('/', (req: Request, res: Response) => {
    //res.send(req.method + ': Request recieved');
    res.sendFile(path.join(meta.dir, 'public/views/user.html'));
});

usersRouter.post('/', (req: Request, res: Response) => {
    res.send(req.method + ': Request recieved');
});

usersRouter.put('/', (req: Request, res: Response) => {
    res.send(req.method + ': Request recieved');
})

usersRouter.patch('/', (req: Request, res: Response) => {
    res.send(req.method + ': Request recieved');
});

usersRouter.delete('/', (req: Request, res: Response) => {
    res.send(req.method + ': Request recieved');
});

export default usersRouter;