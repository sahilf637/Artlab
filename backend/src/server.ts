import express from 'express'
import serverApp from './serverApp'
import config from './config'
import databaseConnection from './database/connection' 


const startServer = async () => {
    
    const app = express()

    await serverApp(app)

    await databaseConnection()

    app.listen(config.PORT, () => {
        console.log(`listening to port ${config.PORT}`)
    })
    .on('error', (err: NodeJS.ErrnoException) => {
        console.log(err)
        process.exit()   
    })

}

startServer()