"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const image_service_1 = require("../services/image.service");
class ImageController {
    constructor() {
        this.imageService = new image_service_1.ImageService();
    }
    async postImage(req, res) {
    }
    async getImage(req, res) {
        const ans = await new image_service_1.ImageService().getImage();
        res.json({ encode: ans });
    }
}
exports.ImageController = ImageController;
