import User from '../model/user'
import { ObjectId } from 'mongoose';
import {
    ApiError,
    BadRequestError,
    STATUSCODE
} from './../../utils/app-errors'


class UserRepository{
    async createUser({ Name, DOB, Art, Email, Password, Phone, Salt}: {
        Name: string;
        DOB: Date;
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