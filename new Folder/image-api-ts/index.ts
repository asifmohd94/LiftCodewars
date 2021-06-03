import express from 'express';
import { Middlewares } from './middlewares';

const app = express();

Middlewares.init(app);

app.use(express.json())

app.listen(7800, () => {
    console.log("Server is running on port 7800");
})