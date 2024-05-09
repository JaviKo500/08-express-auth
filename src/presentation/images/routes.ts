import { Router } from "express";
import { ControllerImage } from "./controller";

export class RoutesImages {
   static get routes(): Router {
      const router = Router();
      const imageController = new ControllerImage();
      router.get('/:type/:img', imageController.getImage );

      return router;
   }  
}