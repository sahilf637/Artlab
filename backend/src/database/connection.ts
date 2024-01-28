import mongoose from 'mongoose'
import config from './../config'

export = async () => {

    try {
        mongoose.connect(config.URL).then(()=> {
            console.log("Connected to DB");
        })
    } catch (error) {
        console.log("Error ========")
        console.log(error)
        process.exit()
    }   
}
