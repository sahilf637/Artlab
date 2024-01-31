import User from '../model/user'
import mongoose, { ObjectId, Schema } from 'mongoose';
import {
    ApiError,
    BadRequestError,
    STATUSCODE
} from './../../utils/app-errors'


class UserRepository{
    async createUser({ Name, DOB, Role, Art, Email, Password, Phone, Salt}: {
        Name: string;
        DOB: Date;
        Role: string;
        Art: string;
        Email: string;
        Password: string;
        Phone: number;
        Salt: string;
    }): Promise<any>{
        try {
            const newUser = new User({
                Name,
                DOB,
                Role,
                Art,
                Email,
                Password,
                Phone,
                Salt,
                Application: []
            })
            const userData = await newUser.save();
            return userData
        } catch (error) {
            console.log(error);
            throw new ApiError(
                "API Error",
                STATUSCODE.INTERNAL_ERROR,
                "Can't Create User"
            )
        }
    }

    async findUser({ Email }: { Email: string }): Promise<any>{
        try {
            const user = await User.findOne({ Email: Email })
            return user
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUSCODE.INTERNAL_ERROR,
                "Can't Find User"
            )
        }
    }

    async findUserById(_id: {_id: ObjectId}): Promise<any> {
        try {
            const userData = await User.findOne({ _id: _id })
            return userData
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUSCODE.INTERNAL_ERROR,
                error.message
            )
        }
    }

    async findAllUser():Promise<any> {
        try {
            const userData = await User.find()
            return userData
        } catch (error) {
            throw new ApiError(
                "API Error",
                STATUSCODE.INTERNAL_ERROR,
                error.message
            ) 
        }
    }

    async applyAdds({ User_id, Adds_id }: { User_id: ObjectId, Adds_id: ObjectId }):Promise<any>{
       try {
        
        const user = await User.findById(User_id)
        
        if(user){
            let isExist = false
            let Application = user.Application
            Application.map((app: any) => {
                if(app == Adds_id)
                isExist = true
            })
            if(!isExist){
            Application.push(Adds_id)
            user.Application = Application
            await user.save()
            }
            return user
        }

        throw new Error("Unable to get User")   
       } catch (error) {
        throw new ApiError(
            "API Error",
            STATUSCODE.INTERNAL_ERROR,
            "Unable to Apply"
        )
       }
    }
}


export default UserRepository