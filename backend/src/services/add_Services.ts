import { Schema } from "mongoose";
import AddRepository from "../database/repository/addRepo";
import {
    ApiError,
    STATUSCODE
} from "./../utils/app-errors"

class AddServices{
    public repo: AddRepository

    constructor(){
        this.repo = new AddRepository()
    }

    async createAdd(input: {
        Art: string,
        Hotel: Schema.Types.ObjectId
        Pay: number,
        Date: Date
    }): Promise<any>{
        try {
            const addData = await this.repo.createAdd(input)

            return addData
        } catch (error) {
            throw new ApiError(
                "data not found",
                error
            )
        }
    }

    async getAllAdds(): Promise<any>{
        try {
            const addData = await this.repo.getAllAdds()

            return addData
        } catch (error) {
            console.log(error);
            
            throw new ApiError(
                "data not found",
                error
            )
        }
    }

    async getAddById(_id: Schema.Types.ObjectId): Promise<any>{
        try {
            const addData = await this.repo.getAddById(_id)

            return addData
        } catch (error) {
            throw new ApiError(
                "data not found",
                error
            )
        }
    }

    async applyForAdd(userId: Schema.Types.ObjectId, addId: Schema.Types.ObjectId): Promise<any> {
        try {
            const add = await this.repo.applyForAdd(userId, addId)

            return add
        } catch (error) {
            throw new ApiError(
                "data not found",
                error
            )
        }
    }
}

export default AddServices