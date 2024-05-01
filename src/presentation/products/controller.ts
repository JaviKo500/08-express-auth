import { Request, Response } from "express";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";

export class ProductsController {
   constructor(
      // private readonly productService: ProductService,
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

   createProduct = (req: Request, res: Response) => {
      // const [ errors, categoryDto ] = CreateCategoryDto.create( req.body ); 
      // if ( errors ) return res.status(400).json({
      //   errors
      // });
      // this.productService.createCategory( categoryDto!, req.body.user )
      //    .then( category => res.status(201).json(category))
      //    .catch( err => this.handleError(err, res) );

      res.status(200).json({
        msg: 'create product successfully',
      });
   }
   getProducts = (req: Request, res: Response) => {
      const { page = 1, limit = 10 } = req.query;

      const [ errors, paginationDto ] = PaginationDto.create( +page, +limit );

      if ( errors ) return res.status(400).json({
        errors,
      });

      // this.productService.getCategories( paginationDto! )
      //    .then( categories => res.status(200).json(categories))
      //    .catch( err=> this.handleError(err, res));
      res.status(200).json({
        msg: 'products',
      });
   }
}