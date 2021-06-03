"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRoutes = void 0;
const image_controller_1 = require("../controllers/image.controller");
const image_service_1 = require("../services/image.service");
const multer_1 = __importDefault(require("multer"));
class ImageRoutes {
    static initRoutes(router) {
        const storage = multer_1.default.memoryStorage();
        const upload = multer_1.default({ storage: storage });
        router.post('/image', upload.single('file'), (req, res, next) => {
            const file = req.file.buffer;
            const result = new image_service_1.ImageService().postImage(file);
            res.send(result);
        });
        router.get('/get', (req, res, next) => {
            const img = new image_controller_1.ImageController().getImage(req, res);
        });
    }
}
exports.ImageRoutes = ImageRoutes;
