import mongoose from 'mongoose'
import Hotel from './../../database/model/hotel'
import fs from 'fs'


mongoose.connect('mongodb+srv://user:user@cluster0.kwwou6o.mongodb.net/Artlab?retryWrites=true&w=majority').then(() => {
    console.log('DB connection successful!')
})

const hotel = JSON.parse(fs.readFileSync('./src/public/Data/Hotel.json', 'utf-8'))

const import_data = async () => {
    try {
      await Hotel.create(hotel);
      console.log("data has been added");
    } catch (err) {
      console.log(err);
    }
} 

import_data();