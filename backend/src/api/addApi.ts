import { ObjectId } from "mongoose";
import Auth from "./Middleware/Auth";
import addServices from "../services/add_Services";
import { Express, Request, Response, NextFunction } from "express";

export default (app: Express) => {
    const Services = new addServices()

    app.get("/adds",Auth, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Services.getAllAdds()

            res.json(data)
        } catch (error) {
            next(error)
        }
    })

    app.get("add/:id", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = <ObjectId><unknown>req.params.id
            const data = await Services.getAddById(id)

            res.json(data)
        } catch (error) {
            next(error)
        }
    })
}