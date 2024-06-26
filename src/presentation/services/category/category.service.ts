import { CategoryModel } from "../../../data";
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from "../../../domain";

export class CategoryService {
   constructor() {
   }

   async createCategory( createCategoryDto: CreateCategoryDto, user: UserEntity ){
      const categoryExists = await CategoryModel.findOne({name: createCategoryDto.name});
      if ( categoryExists ) {
         throw CustomError.badRequest( 'Category already exist' );
      }
      try {
         const category = new CategoryModel({
            ...createCategoryDto,
            user: user.id
         });
         await category.save();

         return {
            id: category.id,
            name: category.name,
            available: category.available,
         };
      } catch (error) {
         throw CustomError.internalServer(`${error}`)
      }
   }

   async getCategories( paginationDto: PaginationDto) {
      
      try {
         const { page, limit } = paginationDto;
         const [ total, categories ] = await Promise.all([
            await CategoryModel.countDocuments(),
            await CategoryModel.find()
               .skip( (page - 1) * limit )
               .limit( limit ),
         ]);
         // const total = await CategoryModel.countDocuments();
         // const categories = await CategoryModel.find()
         //    .skip( (page - 1) * limit )
         //    .limit( limit );
         return {
            page,
            limit,
            total,
            next: `/api/category?page=${page + 1}&limit=${limit}`,
            previous: (page -1 ) > 0 ? `/api/category?page=${page - 1 }&limit=${limit}` : null,
            categories: categories.map( category => {
               const { _id, name, available } = category;
               return {
                  id: _id,
                  name,
                  available,
               }
            })
         }
      } catch (error) {
         throw CustomError.internalServer();
      }
   }
}