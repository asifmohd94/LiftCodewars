import express, { Express } from 'express';
import { router } from './routes/calc'

const app: Express = express();
const port: number = 3000;

app.use('/api/calc', router);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})