import { ValidateSignature } from "../../utils";
import UserServices from "../../services/user_services";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface  Request {
            user: any
        }
    }
}

export default async (req: Request, res: Response, next: NextFunction) => {

    const Services = new UserServices()

    let token;
    if(req.cookies.jwt)
    token = req.cookies.jwt
    else
    next(new Error("Login are not logged in!"))

    const validData = await ValidateSignature(req)

    const userData = await Services.getUserByEmail(validData.Email)

    if(!userData)
    next(new Error("User does not exist anymore"))

    req.user = userData

    next()
}