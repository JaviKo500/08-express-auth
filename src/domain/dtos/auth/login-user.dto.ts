import { regularExps } from "../../../config";

export class LoginUserDto {
   constructor(
      public readonly email: string,
      public readonly password: string,
   ) {
      
   }

   static create( object: { [key: string]: any } ): [string?, LoginUserDto?] {
      const {
         email,
         password
      } = object; 
      if ( !email ) return [ 'Missing email', undefined ];
      if( !regularExps.email.test( email ) ) return [ 'Invalid email', undefined ];
      if ( !password ) return [ 'Missing password', undefined ];
      if ( password < 6 ) return [ 'Password too short', undefined ];
      return [ undefined, new LoginUserDto( email, password )];
   }
}