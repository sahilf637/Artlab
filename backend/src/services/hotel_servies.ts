import hotelRepository from "../database/repository/hotelRepo";
import { Schema } from "mongoose";
import {
    ApiError,
    STATUSCODE
} from "./../utils/app-errors"



class hotelServices{
    public repo: hotelRepository
    constructor(){
        this.repo = new hotelRepository()
    }

    async registerHotel(hotelInput: {
        Name: string,
        Email: string,
        Number: number,
        Photos: Array<string>,
        Docs: Array<string>,
        Location: {
            coordinates: Array<number>,
            address: string
        },
        Manager: Schema.Types.ObjectId
    }): Promise<any> {
        try {
            const hotelData = await this.repo.createHotel(hotelInput)

            return hotelData
        } catch (error) {
            throw new ApiError(
                "Data not found",
                error
            )
        }
    }

    async findHotelByManager(_id : Schema.Types.ObjectId): Promise<any>{
        try {
            const hotelData = await this.repo.findHotel({ _id })

            return hotelData
        } catch (error) {
            throw new ApiError(
                "Data not found",
                error
            )
        }
    } 

    async findAllHotel() : Promise<any>{
        try {
            const hotelsData = await this.repo.findAllHotels()

            return hotelsData
        } catch (error) {
            throw new ApiError(
                "Data not found",
                error
            )
        }
    }

    async findAllAddsByHotel( _id: Schema.Types.ObjectId): Promise<any> {
        try {
            const hotelData = await this.repo.findHotelById({ _id })

            return hotelData.Adds
        } catch (error) {
            throw new ApiError(
                "Data not found",
                error
            )
        }
    }

    async deleteAHotel( _id: Schema.Types.ObjectId ): Promise<any>{
        try {
            const deletedData = await this.repo.deleteHotel({ _id })

            return deletedData
        } catch (error) {
            throw new ApiError(
                "Data not found",
                error
            )           
        }
    }
}

export default hotelServices