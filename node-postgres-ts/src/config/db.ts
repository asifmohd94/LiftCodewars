import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "school_database",
    password: "Pass123",
    port: 5432,
    max: 5
});