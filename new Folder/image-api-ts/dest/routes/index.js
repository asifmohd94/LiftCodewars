"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const image_routes_1 = require("./image.routes");
function init(router) {
    console.log("Routes");
    image_routes_1.ImageRoutes.initRoutes(router);
}
exports.init = init;
