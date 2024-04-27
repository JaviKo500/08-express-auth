import { Request, Response } from "express";
import { CreateCategoryDto, CustomError } from "../../domain";
import { CategoryService } from "../services";

export class CategoryController {
   constructor(
      private readonly categoryService: CategoryService,
   ){}

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
      if ( errors ) return res.status(400).json({
        errors
      });
      this.categoryService.createCategory( categoryDto!, req.body.user )
         .then( category => res.status(201).json(category))
         .catch( err => this.handleError(err, res) );
   }
   getCategories = (req: Request, res: Response) => {
      
      this.categoryService.getCategories()
         .then( categories => res.status(200).json(categories))
         .catch( err=> this.handleError(err, res));
   }
}