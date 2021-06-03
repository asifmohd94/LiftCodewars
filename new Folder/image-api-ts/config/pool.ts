import {Pool} from "pg";

export const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"images",
    password:"Pass123",
    max:5
})
