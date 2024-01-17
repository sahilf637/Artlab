import cors from 'cors'
import express, {Express} from 'express'

export default async (app: Express) => {

    app.use(express.json({limit: '1mb'}))

    app.use(express.urlencoded({extended: true, limit: '1mb'}))

    app.use(cors())

    app.use(express.static('./public'))

    //api

}