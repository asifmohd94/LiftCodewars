"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const pool_1 = require("../config/pool");
class ImageService {
    constructor() { }
    async postImage(file) {
        const result = await pool_1.pool.query("INSERT INTO public.image(data) VALUES($1)", [file]);
        return result;
    }
    async getImage() {
        const result = await pool_1.pool.query("SELECT encode(image.data, 'base64') FROM image");
        return result.rows;
    }
}
exports.ImageService = ImageService;
