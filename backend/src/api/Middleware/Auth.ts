import { ValidateSignature } from "../../utils";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    
    const isValid = ValidateSignature(req)

    if(isValid){
       return next()
    }

    res.status(403).json({
        message: "Unauthorised"
    })
}