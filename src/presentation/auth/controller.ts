import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services";

export class AuthController {
   // DI
   constructor(
      public readonly authService: AuthService
   ) {
      
   }

   private handleError = ( error: unknown, res: Response ) => {
      if ( error instanceof CustomError) {
         return res.status(error.statusCode).json({
           error: error.message
         });
      }

      console.log('<--------------- JK Controller --------------->');
      console.log(error);
      return res.status(500).json({
        error: 'Internal Server Error',
      });
   }
   public registerUser = ( req: Request, res: Response ) => {
      const [ error, registerUserDto ] = RegisterUserDto.create(req.body);
      if ( error ) {
         return res.status(400).json({
           error: error
         });
      }
      this.authService.registerUser(registerUserDto!)
         .then( user => res.status(200).json(user))
         .catch( err => this.handleError( err, res ));
   }
   public loginUser = ( req: Request, res: Response ) => {
      res.status(200).json({
        msg: 'login',
      });
   }
   public validateUser = ( req: Request, res: Response ) => {
      res.status(200).json({
        msg: 'validation',
      });
   }
}