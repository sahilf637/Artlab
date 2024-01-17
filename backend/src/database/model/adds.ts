import mongoose, { Schema, Document } from "mongoose";

interface Adds {
    Art: String;
    Hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel"
    };
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
    pay: Number,
    Date: Date
})

const Adds = mongoose.model<addDocument>('Adds', addSchema)

export default Adds