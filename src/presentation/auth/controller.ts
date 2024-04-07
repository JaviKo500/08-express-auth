import { Request, Response } from "express";

export class AuthController {
   // DI
   constructor() {
      
   }

   public registerUser = ( req: Request, res: Response ) => {
      res.status(200).json({
        msg: 'Registration',
      });
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