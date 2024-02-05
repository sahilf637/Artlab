import  UserRepository  from "../database/repository/userRepo";
import { ObjectId, Schema } from "mongoose";
import { 
    ApiError,
    BadRequestError,
    STATUSCODE
} from "../utils/app-errors";
import {
    GenerateSalt,
    GeneratePassword,
    GenerateSignature,
    ValidatePassword,
    FormatData
} from "./../utils"

class UserServices{
    public repo: UserRepository
    constructor(){
        this.repo = new UserRepository()
    }

    async SingIn(userInput: { Email: string, Password: string }):Promise<any>{
        const { Email, Password } = userInput

        try {
            const user = await this.repo.findUser({ Email })

            if(user){
                const checkedPassword = await ValidatePassword(Password, user.Password, user.Salt)
                if(checkedPassword){
                    const payload = {
                        Email: user.Email,
                        _id: user._id
                    }
                    const token  = await GenerateSignature(payload)

                    return FormatData({ _id: user._id, token: token })
                }
            }
            return null
        } catch (error) {
            console.log(error);   
            throw new ApiError("Data Not Found", error)
        }
    }

    async SignUp(userInput: {
        Name: string,
        DOB: Date,
        Role: string,
        Art: string,
        Email: string,
        Password: string,
        Phone: number
    }): Promise<any>{
        const { Name, DOB, Role, Art, Email, Password, Phone } = userInput

        try {
            const Salt = await GenerateSalt()
            const newPassword = await GeneratePassword(Password, Salt)

            const user = {
                Name,
                DOB,
                Role,
                Art,
                Email,
                Password: newPassword,
                Phone,
                Salt
            }

            const newUser = await this.repo.createUser(user)

            const payload = {
                Email: newUser.Email,
                _id: newUser._id
            }
            const token  = await GenerateSignature(payload)

            return FormatData({ _id: newUser._id, token: token })
        } catch (error) {
            console.log(error);
            throw new ApiError("Data Not Found", error)
        }
    }

    async getAUserById(_id: ObjectId): Promise<any> {
        try {
            const user = await this.repo.findUserById({ _id })

            return FormatData(user)
        } catch (error) {
            console.log(error)
            throw new ApiError("Data Not Found", error)
        }
    }

    async getAllUser(): Promise<any> {
        try {
            const Users = await this.repo.findAllUser()

            return FormatData(Users)
        } catch (error) {
            console.log(error);
            throw new ApiError("Data Not Found", error)
        }
    }

    async getUserByEmail( Email: string ): Promise<any> {
        try {
            const userData = this.repo.findUser({ Email })

            return userData
        } catch (error) {
            throw new ApiError("Data Not Found", error)
        }
    }

    // async applyForAdd( userId: Schema.Types.ObjectId, addId: Schema.Types.ObjectId): Promise<any>{
    //     try {
    //         const add = this.repo.
    //     } catch (error) {
            
    //     }
    // }
}

export default UserServices