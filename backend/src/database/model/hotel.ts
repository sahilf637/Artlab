import mongoose , { Schema, Document, ObjectId } from "mongoose";

interface Hotel {
    Name: String;
    Email: String;
    Number: Number;
    Photos: [String];
    Doc: [String];
    locations: {
            coordinates: [Number],   //latitude then longitude
            address: String,
          };
    Manager: String;
    Adds: [
        {
        type: Schema.Types.ObjectId,
        ref: "Adds",
        Applicant: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
        }
    ]
}

interface hotelDocument extends Hotel , Document{}

const hotelSchema = new Schema<hotelDocument>({
    Name: String,
    Email: String,
    Number: Number,
    Photos: [String],
    Doc: [String],
    locations: {
            coordinates: [Number],   //latitude then longitude
            address: String,
          },
    Manager: String,
    Adds: [
        {
            type: Schema.Types.ObjectId,
            ref: "Adds",
            Applicant: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                }
            ]
        }
    ]
})

const Hotel = mongoose.model<hotelDocument>('Hotel', hotelSchema)

export default Hotel