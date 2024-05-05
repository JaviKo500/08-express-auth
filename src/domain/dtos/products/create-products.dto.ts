import { Validators } from "../../../config";

export class CreateProductsDto {
   private constructor(
      public readonly name: string,
      public readonly available: boolean,
      public readonly price: number,
      public readonly description: string,
      public readonly user: string,
      public readonly category: string,
   ) {}

   static create( object: { [key: string]: any} ): [ string?, CreateProductsDto? ]{
      const {
         name,
         available,
         price,
         description,
         user,
         category,
      } = object;
      
      if ( !name ) return [ 'Missing name', undefined ];
      if ( !user ) return [ 'Missing user', undefined ];
      if ( !Validators.isMongoId( user?.id) ) return [ 'Invalid user id', undefined ];
      if ( !category ) return [ 'Missing category', undefined ];
      if ( !Validators.isMongoId( category ) ) return [ 'Invalid category id', undefined ];
      return [ 
         undefined, 
         new CreateProductsDto(
            name,
            !!available,
            price,
            description,
            user,
            category,
         )
      ];
   }
}