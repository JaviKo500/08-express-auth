import { Request, Response } from "express";
import { CustomError } from "../../domain";

export class CategoryController {
   constructor(){}

   private handleError = ( error: unknown, res: Response ) => {
      if ( error instanceof CustomError) {
         return res.status(error.statusCode).json({
           error: error.message
         });
      }
      return res.status(500).json({
        error: 'Internal Server Error',
      });
   }

   createCategory = (req: Request, res: Response) => {
      res.json('Create category');
   }
   getCategories = (req: Request, res: Response) => {
      console.log('<--------------- JK Controller --------------->');
      console.log('test category');
      res.json('list category');
   }
}