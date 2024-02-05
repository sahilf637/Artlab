import mongoose , { Schema, Document, ObjectId } from "mongoose";

interface Hotel {
    Name: String;
    Email: String;
    Number: Number;
    Photos: [String];
    Doc: [String];
    Location: {
            coordinates: Array<Number>,   //latitude then longitude
            address: String,
          };
    Manager: Schema.Types.ObjectId
}

interface hotelDocument extends Hotel , Document{}

const hotelSchema = new Schema<hotelDocument>({
    Name: String,
    Email: String,
    Number: Number,
    Photos: [String],
    Doc: [String],
    Location: {
            coordinates: [Number, Number],   //latitude then longitude
            address: String,
          },
    Manager: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

hotelSchema.virtual('Adds', {
    ref: 'Adds',
    foreignField: 'Hotel',
    localField: '_id'
})

const Hotel = mongoose.model<hotelDocument>('Hotel', hotelSchema)

export default Hotel