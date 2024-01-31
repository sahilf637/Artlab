import mongoose, { Schema, Document } from "mongoose";

interface Adds {
    Art: String;
    Hotel: Schema.Types.ObjectId,
    Applicants: Schema.Types.ObjectId
    pay: Number;
    Date: Date;
}

interface addDocument extends Adds, Document{}

const addSchema =  new Schema<addDocument>({
    Art: String,
    Hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel"
    },
    Applicants: {
        type: Schema.Types.ObjectId,
        ref: "USer"
    },
    pay: Number,
    Date: Date
})

const Adds = mongoose.model<addDocument>('Adds', addSchema)

export default Adds