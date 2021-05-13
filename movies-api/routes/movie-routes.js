const express = require('express');
const pool = require('../config/db');

const router = express.Router();

router.get('/film', async (req, res) => {
    if (Object.keys(req.query).length == 0) {
        res.status(400)
            .send({ message: "Enter a query" });
    }
    try {

        const result = await pool.query("SELECT f.title,f.description,f.release_year,f.rental_rate,f.rating,c.category_id,c.name category FROM film f INNER JOIN film_category fc ON f.film_id = fc.film_id INNER JOIN category c On fc.category_id = c.category_id WHERE f.title = $1 OR f.release_year = $2 OR f.rating = $3 OR c.name = $4", [req.query.title, req.query.year, req.query.rating, req.query.category]);
        console.log(res.body);
        res.send(result.rows);
    } catch (err) {
        console.log(err);
        res.status(404)
            .send("Not Found")
    }
})

router.post('/create/film', async (req, res) => {
    try {
        console.log(req.body);
        let query = "INSERT INTO public.film(film_id, title, description, release_year, language_id, rental_rate, replacement_cost, rating, length, rental_duration,last_update) VALUES ";
        let values = [];
        let ans = "";
        let x = 1;

        for (let i = 0; i < req.body.length; i++) {
            ans += "(";
            for (let j = 0; j < 11; j++) {
                ans += "$" + x + ",";
                x++;
            }
            ans = ans.substring(0, ans.length - 1);
            ans += "),";
            query += ans;
            values.push(req.body[i].film_id);
            values.push(req.body[i].title);
            values.push(req.body[i].description);
            values.push(req.body[i].release_year);
            values.push(req.body[i].language_id);
            values.push(req.body[i].rental_rate);
            values.push(req.body[i].replacement_cost);
            values.push(req.body[i].rating);
            values.push(req.body[i].length);
            values.push(req.body[i].rental_duration);
            values.push(req.body[i].last_update);

            ans = "";
        }

        query = query.substring(0, query.length - 1);
        console.log(query);
        console.log(values);
        const result = await pool.query(query, values);
        res.send("Created");

    } catch (err) {
        console.log(err);
        res.status(500)
            .send({ message: "cannot be created" });
    }
})

router.put('/update/film', async (req, res) => {
    try {
        const result = await pool.query("UPDATE public.film SET rental_rate = $1, replacement_cost = $2 WHERE film_id = $3", [req.body.rate, req.body.replacement_cost, req.query.film_id]);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(404)
            .send("Entered film is not found");
    }
})

router.delete('/delete/film', async (req, res) => {
    console.log(req.query)
    try {
        const result = await pool.query("DELETE FROM public.film WHERE film_id = $1", [req.query.film_id]);
        res.send(result.rows);
    } catch (err) {
        console.log(err);
        res.status(404)
            .send({ message: "Entered film cannot be found" })
    }
})

router.post('/create/customer', async (req, res) => {
    try {
        console.log(req.body);
        let query = "INSERT INTO public.customer(customer_id, store_id, first_name, last_name, email, address_id, activebool, create_date, active) VALUES ";
        let values = [];
        let x = 1;
        let ans = "";
        for (let i = 0; i < req.body.length; i++) {
            ans += "("
            for (let j = 0; j < 9; j++) {
                ans += "$" + x + ",";
                x++;
            }
            ans = ans.substring(0, ans.length - 1);
            ans += "),";
            query += ans;
            values.push(req.body[i].customer_id);
            values.push(req.body[i].store_id);
            values.push(req.body[i].first_name);
            values.push(req.body[i].last_name);
            values.push(req.body[i].email);
            values.push(req.body[i].address_id);
            values.push(req.body[i].activebool);
            values.push(req.body[i].create_date);
            values.push(req.body[i].active);
            ans = "";
        }
        query = query.substring(0, query.length - 1);

        const result = await pool.query(query, values);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send("Cannot create")
    }
})

router.put('/update/customer', async (req, res) => {
    try {

        const result = await pool.query("UPDATE public.customer set address_id = $1, email = $2 WHERE customer_id = $3", [req.body.address_id, req.body.email, req.query.customer_id]);
        res.send(result);

    } catch (err) {
        console.log(err);
        res.status(404)
            .send("Entered customer not found");
    }
})

router.delete('/delete/customer', async (req, res) => {
    try {
        const result = await pool.query("DELETE FROM public.customer WHERE customer_id = $1 ", [req.query.id]);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(404)
            .send("Customer not found");
    }

})

router.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        let query = "INSERT INTO public.category(category_id, name, last_update) VALUES ";
        let values = [];
        let x = 1;
        let ans = "";
        for (let i = 0; i < req.body.length; i++) {
            ans += "("
            for (let j = 0; j < 3; j++) {
                ans += "$" + x + ",";
                x++;
            }
            ans = ans.substring(0, ans.length - 1);
            ans += "),";
            query += ans;
            values.push(req.body[i].category_id);
            values.push(req.body[i].name);
            values.push(req.body[i].last_update);
            ans = ""
        }
        query = query.substring(0, query.length - 1);
        console.log(query)
        console.log(values);
        const result = await pool.query(query, values);
        res.send("Created")
    } catch (err) {
        console.log(err);
        res.send("Cannot create")
    }
})

router.post('/rent/film', async (req, res) => {
    try {
        const result = await pool.query("SELECT f.title,f.film_id,inventory_id FROM film f INNER JOIN inventory i on f.film_id=i.film_id where f.film_id = $1 ", [req.query.film_id]);

        if (result.rows.length == 0) {
            res.status(404).send({ message: "entered movie is not present" })
        }
        else {
            let query = "INSERT INTO public.rental(rental_id, release_date, inventory_id, customer_id, return_date, staff_id, last_update) VALUES ";
            let values = [];
            let x = 1;
            let ans = "";
            for (let i = 0; i < req.body.length; i++) {
                ans += "(";
                for (let j = 0; j < 7; j++) {
                    ans += "$" + x + ",";
                    x++;
                }
                ans = ans.substring(0, ans.length - 1);
                ans += "),";
                query += ans;
                values.push(req.body[i].rental_id);
                values.push(req.body[i].release_date);
                values.push(req.body[i].inventory_id);
                values.push(req.body[i].customer_id);
                values.push(req.body[i].return_date);
                values.push(req.body[i].staff_id);
                values.push(req.body[i].last_update);
                ans = "";

            }
            query = query.substring(0, query.length - 1);
            const rent = pool.query(query, values);
            res.send(rent);
        }
    } catch (err) {
        console.log(err);
        res.status(400)
            .send({ message: "Bad Request" })
    }

    router.post('/create/actor', async (req, res) => {

    })

    router.get('/film/actor', async (req, res) => {

    })

})



router.post('/create/actor', async (req, res) => {
try {
    console.log(req.body);
    let query = "INSERT INTO public.category(actor_id, first_name, last_name, last_update) VALUES ";
    let values = [];
    let x = 1;
    let ans = "";
    for (let i = 0; i < req.body.length; i++) {
        ans += "("
        for (let j = 0; j < 3; j++) {
            ans += "$" + x + ",";
            x++;
        }
        ans = ans.substring(0, ans.length - 1);
        ans += "),";
        query += ans;
        values.push(req.body[i].actor_id);
        values.push(req.body[i].first_name);
        values.push(req.body[i].last_name);
        values.push(req.body[i].last_update);
        ans = ""
    }
    query = query.substring(0, query.length - 1);
    console.log(query)
    console.log(values);
    const result = await pool.query(query, values);
    res.send(result)
} catch (err){
     console.log(err);
     res.status(500)
     .send({message:"internal server error"})
}
})

module.exports = router;