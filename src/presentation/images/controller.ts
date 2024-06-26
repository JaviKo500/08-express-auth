import { Request, Response } from "express";
import path from "path";
import fs from 'fs';

export class ControllerImage {
   constructor() {
      
   }

   getImage = ( req: Request, res: Response ) => {
      const { type, img } = req.params; 
      const imagePath = path.resolve( __dirname, `../../../uploads/${type}/${img}` );

      if ( !fs.existsSync( imagePath) ) {
         res.status(404).json({
           msg: 'Image not found',
         });
      }

      res.sendFile( imagePath );
   }
}