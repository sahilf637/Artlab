import Model from '../../database/model'
import fs from 'fs'
import DB from '../../database'

async function Setdata(){ 
    await DB.databaseConnection()

    const data = fs.readFile('Hotel.json', () => {
        console.log("file read");
    })

}

Setdata;