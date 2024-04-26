import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";

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
      const [ errors, categoryDto ] = CreateCategoryDto.create( req.body ); 
      if ( errors ) {
         return res.status(400).json({
           errors
         });
      }
      res.status(200).json({
        categoryDto,
        errors
      });
   }
   getCategories = (req: Request, res: Response) => {
      console.log('<--------------- JK Controller --------------->');
      console.log('test category');
      res.json('list category');
   }
}