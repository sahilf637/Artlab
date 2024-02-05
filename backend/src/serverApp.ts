import cors from 'cors'
import express, {Express} from 'express'
import cookieParser from 'cookie-parser'
import user from './api/userApi'
import hotel from './api/hotelApi'
import Add from './api/addApi'
import morgan from 'morgan'

export default async (app: Express) => {

    app.use(express.json({limit: '1mb'}))

    app.use(express.urlencoded({extended: true, limit: '1mb'}))

    app.use(cors())

    // if(config.NODE_ENV === "development")
    app.use(morgan('dev'))

    app.use(express.static('./public'))

    app.use(cookieParser())

    //api
    user(app)

    hotel(app)

    Add(app)
}