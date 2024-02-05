import mongoose, { Schema, Document } from "mongoose";

interface Adds {
    Art: String;
    Hotel: Schema.Types.ObjectId,
    Applicants: Array<Schema.Types.ObjectId>;
    Pay: Number;
    Date: Date;
}

interface addDocument extends Adds, Document{}

const addSchema =  new Schema<addDocument>({
    Art: String,
    Hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel"
    },
    Applicants: [{
        type: Schema.Types.ObjectId,
        ref: "USer"
    }],
    Pay: Number,
    Date: Date
})



const Adds = mongoose.model<addDocument>('Adds', addSchema)

export default Adds