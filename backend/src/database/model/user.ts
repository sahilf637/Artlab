import mongoose, { Schema, Document } from "mongoose";

interface User {
    Name: string;
    DOB: Date;
    Art: string;
    Email: string;
    Password: string;
    Phone: number;
    Salt: string;
    Application: Array<Schema.Types.ObjectId | string>;
}

interface userDocument extends User , Document {}

const userSchema = new Schema<userDocument>({
    Name: String,
    DOB: Date,
    Art: String,
    Email: String,
    Password: String,
    Phone: Number,
    Salt: String,
    Application: [
        {
            type: Schema.Types.ObjectId,
            ref: "Adds"
        }
    ]
},{
    toJSON: {
        transform(doc, ret){
            delete ret.Password;
        }
    }
})

const User = mongoose.model<userDocument>('User', userSchema)

export default User