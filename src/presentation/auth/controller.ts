import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";
import { AuthService } from "../services";

export class AuthController {
   // DI
   constructor(
      public readonly authService: AuthService
   ) {
      
   }

   public registerUser = ( req: Request, res: Response ) => {
      const [ error, registerUserDto ] = RegisterUserDto.create(req.body);
      if ( error ) {
         return res.status(400).json({
           error: error
         });
      }
      this.authService.registerUser(registerUserDto!)
         .then( (user) => res.status(200).json(user));
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