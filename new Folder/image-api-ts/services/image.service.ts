import { pool } from "../config/pool";
import { IImage } from "../models/image.model";


export class ImageService {

    constructor() { }

    public async postImage(file: Buffer): Promise<any> {
        const result = await pool.query("INSERT INTO public.image(data) VALUES($1)", [file]);
        return result;
    }

    public async getImage(): Promise<any> {
        const result = await pool.query("SELECT encode(image.data, 'base64') FROM image");
        return result.rows;
    }
}