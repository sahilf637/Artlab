import serverApp from "../serverApp";
import hotelServices from "../services/hotel_servies";
import { Request, Response, NextFunction, Express } from "express";
import { ObjectId } from "mongoose";
import { getId } from "../utils";


export default (app: Express) => {
    const Services = new hotelServices()

    app.post("/hotel/register", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                Name,
                Email,
                Number,
                Photos,
                Docs,
                Location
            } = req.body
            const Manager = await <ObjectId><unknown>getId(req)
            const data = await Services.registerHotel({ Name, Email, Number, Photos, Docs, Location, Manager})

            res.json(data)
        } catch (error) {
            next(error)
        }
    })

    app.get("/hotel", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Services.findAllHotel()

            res.json(data)
        } catch (error) {
            next(error)
        }
    })

    app.get("/hotel/:id/Adds", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = <ObjectId><unknown> req.params
            const data = Services.findAllAddsByHotel(_id)

            res.json(data)
        } catch (error) {
            next(error)            
        }
    })

    app.delete("/hotel/:id", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = <ObjectId><unknown> req.params
            const data = await Services.deleteAHotel(_id)
        } catch (error) {
            next(error)
        }
    })
}