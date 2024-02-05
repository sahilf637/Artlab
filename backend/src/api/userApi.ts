import { ObjectId } from "mongoose";
import  UserServices  from "../services/user_services";
import AddServices from "../services/add_Services";
import { Express, Request, Response, NextFunction } from "express";
import Auth from "./Middleware/Auth";
import addServices from "../services/add_Services";

export default (app: Express) => {
    const userServices = new UserServices()
    const addServices = new AddServices()

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
            const user = await userServices.SignUp({Name, DOB, Role, Art, Email, Password, Phone})

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

            const user = await userServices.SingIn({ Email, Password })

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
            const user = await userServices.getAUserById( id )

            res.json(user)
        } catch (error) {
            next(error)
        }
    })

    app.get("/user", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userServices.getAllUser()

            res.json(users)
        } catch (error) {
            next(error)
        }
    })

    app.post("/user/add/:id",Auth , async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user._id
            const addId = <ObjectId><unknown>req.params.id

            const add = await addServices.applyForAdd(userId, addId)

            res.json(add)
        } catch (error) {
            next(error)
        }
    })
}