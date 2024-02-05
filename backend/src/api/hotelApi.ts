import hotelServices from "../services/hotel_servies";
import addServices from "../services/add_Services";
import Auth from "./Middleware/Auth";
import { Request, Response, NextFunction, Express, json } from "express";
import { ObjectId } from "mongoose";
import { ValidateSignature } from "../utils";


export default (app: Express) => {
    const HotelServices = new hotelServices()
    const AddServices = new addServices()

    app.post("/hotel/register",Auth ,async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                Name,
                Email,
                Number,
                Photos,
                Docs,
                Location
            } = req.body
            const validData = await ValidateSignature(req)

            const Manager = validData._id
            const data = await HotelServices.registerHotel({ Name, Email, Number, Photos, Docs, Location, Manager})

            res.json(data)
        } catch (error) {
            next(error)
        }
    })

    app.get("/hotel", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await HotelServices.findAllHotel()

            res.json(data)
        } catch (error) {
            next(error)
        }
    })

    app.get("/hotel/:id/Adds",Auth ,async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = <ObjectId><unknown> req.params
            const data = HotelServices.findAllAddsByHotel(_id)

            res.json(data)
        } catch (error) {
            next(error)            
        }
    })

    app.delete("/hotel/:id",Auth ,async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = <ObjectId><unknown> req.params
            const data = await HotelServices.deleteAHotel(_id)
        } catch (error) {
            next(error)
        }
    })

    app.post("/hotel/add/publish",Auth ,async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                Art,
                Pay,
                Date
            } = req.body

            const Hotel = req.user.Hotel
            const hotelAdd = await AddServices.createAdd({ Art,Hotel, Pay, Date })

            res.json(hotelAdd)
        } catch (error) {
            next(error)
        }
    })
}