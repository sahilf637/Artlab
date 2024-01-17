import mongoose from 'mongoose'
import config from './../config'

export = async () => {

    try {
        mongoose.connect(config.URL)
        console.log('Db Connected')
    } catch (error) {
        console.log("Error ========")
        console.log(error)
        process.exit()
    }   
}
