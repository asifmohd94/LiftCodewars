const express = require('express');
const movie = require('./routes/movie-routes')
const port = 4000;
const app = express();


app.use(express.json());
app.use('/api/movie',movie);

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running fine on port ${port}`);
})