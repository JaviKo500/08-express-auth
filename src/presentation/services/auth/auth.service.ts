import { bcryptAdapter, envs, JwtAdapter } from "../../../config";
import { UserModel } from "../../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../../domain";
import { EmailService } from "../email/email.service";

export class AuthService {
   // DI
   constructor(
      private readonly emailService: EmailService,
   ) {
      
   }

   public async registerUser ( registerUserDto: RegisterUserDto ) {
      const existUser = await UserModel.findOne({ email: registerUserDto.email });
      if ( existUser ) throw CustomError.badRequest('User already exists');
      try {
         const user = new UserModel(registerUserDto);
         user.password = bcryptAdapter.hash( registerUserDto.password );
         await user.save();
         
         // Email verification
         await this.sendEmailValidationLink( user.email ); 

         const { password, ...userEntity } = UserEntity.fromObject( user );

         // jwt user authentication
         const token = await JwtAdapter.generateToken( { id: userEntity.id } );
         if ( !token ) {
            throw CustomError.internalServer('Error generating token');
         }

         return {
            user: userEntity,
            token,
         };
      } catch (error) {
         throw CustomError.internalServer(`${error}`)
      }
   }

   /**
    * loginUser
    */
   public async loginUser( loginUserDto: LoginUserDto) {
      const existUser = await UserModel.findOne({ email: loginUserDto.email });
      if ( !existUser ) throw CustomError.badRequest('Email and password are not exist');
      const isMatching = bcryptAdapter.compare( loginUserDto.password, existUser.password );
      if ( !isMatching ) {
         throw CustomError.unauthorized( 'Invalid user credentials.' );
      }
      const { password, ...userEntity } = UserEntity.fromObject( existUser );
      const token = await JwtAdapter.generateToken( { id: userEntity.id } );
      if ( !token ) {
         throw CustomError.internalServer('Error generating token');
      }
      return {
         user: userEntity,
         token,
      };
   }

   private sendEmailValidationLink = async ( email: string ) => {
      const token = await JwtAdapter.generateToken( { email } );

      if ( !token ) {
         throw CustomError.internalServer('Error generating token link');
      }

      const link = `${ envs.WEB_SERVICE_URL }/auth/validate-email/${ token }`;

      const html = `
         <h1>Validate your email</h1>
         <p>Click on the following link to validate your email</p>
         <a href="${link}"> Validate your email: ${email} </a>
      `;
      const options =  {
         to: email,
         subject: 'Validate your email',
         htmlBody: html,
      };
      const isSent = await this.emailService.sendEmail( options );

      if ( !isSent ) {
         throw CustomError.internalServer('Error sending email');
      }

      return true;
   }
}