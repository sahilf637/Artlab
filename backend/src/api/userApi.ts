import { ObjectId } from "mongoose";
import  UserServices  from "../services/user_services";
import { Express, Request, Response, NextFunction } from "express";
import Auth from "./Middleware/Auth";

export default (app: Express) => {
    const services = new UserServices()

    app.post("/user/signup", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                Name,
                DOB,
                Role,
                Art,
                Email,
                Password,
                Phone
            } = req.body
            const user = await services.SignUp({Name, DOB, Role, Art, Email, Password, Phone})

            const cookieOptions = {
                expire: new Date( Date.now() + 30*24*60*60*1000),
                httpOnly: false,
                secure: false 
            }
            res.cookie('jwt', user.data.token, cookieOptions)

            res.json(user)     
        } catch (error) {
            next(error)
        }
    })

    app.post("/user/signin", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                Email,
                Password
            } = req.body

            const user = await services.SingIn({ Email, Password })

            const cookieOptions = {
                expire: new Date( Date.now() + 30*24*60*60*1000),
                httpOnly: false,
                secure: false 
            }

            res.cookie('jwt', user.data.token, cookieOptions)

            res.json(user)
        } catch (error) {
            next(error)
        }
    })

    app.get("/user/:id", Auth, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = <ObjectId><unknown>req.params.id
            const user = await services.getAUser( id )

            res.json(user)
        } catch (error) {
            next(error)
        }
    })

    app.get("/user", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await services.getAllUser()

            res.json(users)
        } catch (error) {
            next(error)
        }
    })
}