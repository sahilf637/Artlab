import  Jwt, { JwtPayload }  from "jsonwebtoken"
import bcrypt from "bcrypt"
import config from "../config"
import { Request } from "express"
import { ObjectId } from "mongoose"

export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string):Promise<string> => {
    return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (
    enteredPassword: string,
    savedPassword: string,
    salt: string
):Promise<boolean>=>{
    return (await GeneratePassword(enteredPassword, salt) === savedPassword)
}


export const GenerateSignature = async (payload: object):Promise<any> => {
    try {
        return await Jwt.sign(payload, config.APP_SECRET, { expiresIn: "30d" })
    } catch (error) {
        console.log(error);
        return error
    }
}

export const ValidateSignature = async (req: Request): Promise<any> => {
    try {
        const Signature = req.cookies.jwt
        const data = await Jwt.verify(Signature, config.APP_SECRET)
        if(!data){
            throw new Error("Invalid Signature")
        }
        return data
    } catch (error) {
        return error
    }
}

export const FormatData = (data: any) => {
    if(data)
    return { data }
    else
    throw new Error("No data found")
}