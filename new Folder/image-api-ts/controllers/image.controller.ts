import { Request, Response } from "express";
import { ImageService } from '../services/image.service';


export class ImageController {

    imageService:object;
    constructor() {
     this.imageService = new ImageService()
    }
    public async postImage(req: Request,res: Response) {
    
    }

    public async getImage(req: Request, res: Response) {
     const ans =await new ImageService().getImage();
     res.json({encode:ans});   
        
    }

}