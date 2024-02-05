import mongoose, { Schema, Document } from "mongoose";

interface User {
    Name: string;
    DOB: Date;
    Role: string,
    Hotel: Schema.Types.ObjectId,
    Art: string;
    Email: string;
    Password: string;
    Phone: number;
    Salt: string;
}

interface userDocument extends User , Document {}

const userSchema = new Schema<userDocument>({
    Name: String,
    DOB: Date,
    Role: {
        type: String,
        enum: ["Artist", "Manager", "Admin"],
        default: "Artist"
    },
    Hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel"
    },
    Art: String,
    Email: String,
    Password: String,
    Phone: Number,
    Salt: String,
},{
    toJSON: {   virtuals: true,
        transform(doc, ret){
            delete ret.Password;
        }
    },
    toObject: { virtuals: true }
})

userSchema.virtual('Application', {
    ref: 'Adds',
    foreignField: 'Applicants',
    localField: '_id'
})

const User = mongoose.model<userDocument>('User', userSchema)

export default User