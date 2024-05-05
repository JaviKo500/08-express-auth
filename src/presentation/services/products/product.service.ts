import { ProductModel } from "../../../data";
import { CreateProductsDto, CustomError, PaginationDto, UserEntity } from "../../../domain";

export class ProductsService {
   constructor() {
   }

   async createProduct( createProductDto: CreateProductsDto){
      const productExists = await ProductModel.findOne({name: createProductDto.name});
      if ( productExists ) {
         throw CustomError.badRequest( 'Product already exist' );
      }
      try {
         const product = new ProductModel( createProductDto );
         await product.save();

         return product;
      } catch (error) {
         throw CustomError.internalServer(`${error}`)
      }
   }

   async getProducts( paginationDto: PaginationDto) {
      
      try {
         const { page, limit } = paginationDto;
         const [ total, products ] = await Promise.all([
            await ProductModel.countDocuments(),
            await ProductModel.find()
               .skip( (page - 1) * limit )
               .limit( limit )
               .populate( 'user' )
               .populate( 'category' )
               // todo: populate
         ]);
         return {
            page,
            limit,
            total,
            next: `/api/product?page=${page + 1}&limit=${limit}`,
            previous: (page -1 ) > 0 ? `/api/product?page=${page - 1 }&limit=${limit}` : null,
            products: products.map( product => {
               const { _id, name, available, user, category } = product;
               return {
                  id: _id,
                  name,
                  available,
                  user, 
                  category,
               }
            })
         }
      } catch (error) {
         throw CustomError.internalServer();
      }
   }
}