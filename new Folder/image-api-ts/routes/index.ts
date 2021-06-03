import { Router } from "express";
import { ImageRoutes } from './image.routes'

export function init(router: Router) {
     console.log("Routes")
    ImageRoutes.initRoutes(router);
}