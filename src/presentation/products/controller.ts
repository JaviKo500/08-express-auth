import { Request, Response } from "express";
import { CreateProductsDto, CustomError, PaginationDto } from "../../domain";
import { ProductsService } from "../services";

export class ProductsController {
   constructor(
      private readonly productService: ProductsService,
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
      const [ errors, createProductDto ] = CreateProductsDto.create( {
         ...req.body,
         user: req.body.user.id
      } ); 
      if ( errors ) return res.status(400).json({
        errors
      });
      this.productService.createProduct( createProductDto! )
         .then( product => res.status(201).json(product))
         .catch( err => this.handleError(err, res) );
   }
   getProducts = (req: Request, res: Response) => {
      const { page = 1, limit = 10 } = req.query;

      const [ errors, paginationDto ] = PaginationDto.create( +page, +limit );

      if ( errors ) return res.status(400).json({
        errors,
      });

      this.productService.getProducts( paginationDto! )
         .then( products => res.status(200).json(products))
         .catch( err=> this.handleError(err, res));
   }
}