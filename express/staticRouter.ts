import express from 'express';
import path from 'path';

const staticRouter = express.Router();
const meta = import.meta;

staticRouter.use('/public', express.static(path.join(meta.dir, 'public')));

export default staticRouter;