const express = require('express');
const tables = require('./routes/table_routes');

const port = 4000;
const app = express();

app.use(express.json());
app.use('/api/school', tables);


app.listen(port, (err, res) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server is up and running on port ${port}`)
})
