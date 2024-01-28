import  UserServices  from "../services/user_services";
import { Express, Request, Response, NextFunction } from "express";

export default (app: Express) => {
    const services = new UserServices()

    app.post("/user/signup", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                Name,
                DOB,
                Art,
                Email,
                Password,
                Phone
            } = req.body
            const user = await services.SignUp({Name, DOB, Art, Email, Password, Phone})

            res.send(user)     
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

            res.send(user)
        } catch (error) {
            next(error)
        }
    })
}