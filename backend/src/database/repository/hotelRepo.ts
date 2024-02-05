import Hotel from './../model/hotel'
import Adds from './../model/adds'
import User from '../model/user'
import { ObjectId, Schema } from 'mongoose'
import {
    STATUSCODE,
    ApiError
} from './../../utils/app-errors'

class hotelRepository{
    async createHotel({ Name, Email, Number, Photos, Docs, Location, Manager }: {
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
    }): Promise<any>{
        try {
            const newHotel = new Hotel({
                Name,
                Email,
                Number,
                Photos,
                Docs,
                Location,
                Manager,
                Adds: []
            })
            const hotelData = await newHotel.save()
            
            await User.findByIdAndUpdate(Manager, { Hotel:  hotelData._id})
            
            return hotelData
        } catch (error) {
            // console.log(error);
            
            throw new ApiError(
                "API Error",
                STATUSCODE.INTERNAL_ERROR,
                "Can't Create Hotel"
            )   
        }
    }

    async findHotel(_id: { _id: ObjectId }): Promise<any>{
        try {
            const hotelData = await Hotel.findOne({ Manager: _id })
            return hotelData
        } catch (error) {
            throw new ApiError(
                "Api Error",
            )
        }
    }

    async findHotelById(_id: {_id: ObjectId}): Promise<any> {
        try {
            const HotelData = await Hotel.findOne({ _id: _id })
            return HotelData
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUSCODE.INTERNAL_ERROR,
                error.message
            )
        }
    }

    async findAllHotels():Promise<any> {
        try {
            const HotelData = await Hotel.find().populate({
                path: 'Adds'
            })
            return HotelData
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUSCODE.INTERNAL_ERROR,
                error.message
            ) 
        }
    }

    // async findAllAddsByHotel(_id: { _id: ObjectId }): Promise<any> {
    //     try {
    //         const hotelAdds = await Adds.find({ Hotel: _id })

    //         if(hotelAdds)
    //         return hotelAdds
    //         else
    //         throw new Error("Can't Find any Adds")
    //     } catch (error) {
    //         throw new ApiError(
    //             "API Error",
    //             STATUSCODE.INTERNAL_ERROR,
    //             error.message
    //         ) 
    //     }
    // }

    async deleteHotel(_id: { _id: ObjectId }): Promise<any>{
        try {
            const data = await Hotel.deleteOne({ _id: _id })
            
            return data
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUSCODE.INTERNAL_ERROR,
                error.message
            )
        }
    }

}

export default hotelRepository