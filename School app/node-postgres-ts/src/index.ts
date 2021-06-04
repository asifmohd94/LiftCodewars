import express, { Express } from 'express'
import { router } from './routes/table'
import  cors from 'cors'

const port = 7800;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/school', router);

app.listen(port, () => {
    console.log(`Server is running fine on port ${port}`)
})
