import mongoose, { Schema } from "mongoose";

interface ILastShortVid extends Document {
  userId: string | null;
  edAccountId: mongoose.Types.ObjectId;
  createdDate: Date;
  updatedDate: Date;
}

const lastShortVid: Schema<ILastShortVid> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User collection
    required: true,
  },
  edAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShortVideo", // Reference to ShortVideo collection
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

lastShortVid.pre<ILastShortVid>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const LastShortVid = mongoose.model<ILastShortVid>(
  "lastshortvid",
  lastShortVid
);

export { LastShortVid, ILastShortVid };
