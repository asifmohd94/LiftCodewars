import { Router } from "express";
import { ImageController } from '../controllers/image.controller'
import { ImageService } from '../services/image.service';
import multer from 'multer'

export class ImageRoutes {
    public static initRoutes(router: Router) {

        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage });

        router.post('/image', upload.single('file'), (req, res, next) => {
            const file = req.file.buffer;
            const result = new ImageService().postImage(file);

            res.send(result);
        });

        router.get('/get', (req, res, next) => {
            const img = new ImageController().getImage(req, res);
        })

    }
}