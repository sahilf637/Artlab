import  UserRepository  from "../database/repository/userRepo";
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
    public repo: any
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

                    return FormatData({ _id: user._id, token })
                }
            }
            return null
        } catch (error) {
            throw new ApiError("Unable to get user", error)
        }
    }

    async SignUp(userInput: {
        Name: string,
        DOB: Date,
        Art: string,
        Email: string,
        Password: string,
        Phone: number
    }): Promise<any>{
        const { Name, DOB, Art, Email, Password, Phone } = userInput

        try {
            const Salt = await GenerateSalt()
            const newPassword = await GeneratePassword(Password, Salt)

            const user = {
                Name,
                DOB,
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

            return FormatData({ _id: newUser._id, token })
        } catch (error) {
            console.log(error);
            throw new ApiError("Can't create new User", error)
        }
    }
}

export default UserServices