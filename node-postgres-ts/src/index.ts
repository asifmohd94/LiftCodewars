import express, { Express } from 'express'
import { router } from './routes/table'


const app = express();

app.use(express.json())
app.use('/api/school', router);

app.listen(7800, () => {
    console.log("Server is running fine")
})
