import { Express, Router } from "express";
import express from "express";
import { init } from "../routes/index";
import cors from 'cors'


export class Middlewares {

    public static init(app: Express) {
       
        
        app.use(cors());
        
        const router = Router();
        
        app.use(express.json());
        
        app.use("/api", router);
        
        init(router);
    }
}