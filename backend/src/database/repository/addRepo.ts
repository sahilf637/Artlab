import Adds from "../model/adds";
import { Schema } from "mongoose";
import {
    ApiError,
    STATUSCODE
} from './../../utils/app-errors'


class AddRepository{
    async createAdd({ Art, Hotel, Pay, Date }: {
        Art: string,
        Hotel: Schema.Types.ObjectId,
        Pay: number,
        Date: Date
    }): Promise<any> {
        try {
            const newAdd = new Adds({
                Art,
                Hotel,
                Applicants: [],
                Pay,
                Date
            })
            const add = await newAdd.save()

            return add
        } catch (error) {
            console.log(error);
            
            throw new ApiError(
                "Api Error",
                STATUSCODE.INTERNAL_ERROR,
                "Can't create Add"
            )
        }
    }

    async getAllAdds(): Promise<any> {
        try {
            const adds = await Adds.find()

            return adds
        } catch (error) {
            throw new ApiError(
                "Api Error",
                STATUSCODE.INTERNAL_ERROR,
                "Can't get Adds"
            )
        }
    }

    async getAddById(_id: Schema.Types.ObjectId): Promise<any> {
        try {
            const add = await Adds.findById(_id)

            return add
        } catch (error) {
            throw new ApiError(
                "Api Error",
                STATUSCODE.INTERNAL_ERROR,
                "Can't get Add"
            )            
        }
    }

    async applyForAdd( userId: Schema.Types.ObjectId, addId: Schema.Types.ObjectId ): Promise<any>{
        try {
            const add = await Adds.findByIdAndUpdate(addId, { $push: { Applicants: userId } })

            return add

        } catch (error) {
            throw new ApiError(
                "Api Error",
                STATUSCODE.INTERNAL_ERROR,
                "Can't get Add"
            )   
        }
    }
}


export default AddRepository