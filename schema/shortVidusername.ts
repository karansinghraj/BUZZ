import mongoose, { Schema, Document } from "mongoose";

interface IShortVideo extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  userName: string;
  shortModel: string;
  shortId: mongoose.Types.ObjectId;
  baseURL: string;
  path: string;
  createdDate: Date;
  updatedDate: Date;
}

const ShortVideoSchema: Schema<IShortVideo> = new Schema<IShortVideo>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming "User" is the referenced model name
  },
  fullName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  shortModel: {
    type: String,
    required: true,
    enum: [
      "ITProfileType",
      "Education",
      "Agriculture",
      "Transport",
      "ArtDesign",
      "Financial",
      "Hospitality",
      "Environmental",
      "Construction",
      "RealEstate",
      "ProfessionalServices",
      "GeneralMerchandise",
    ],
  },
  shortId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "EducationAccount",
  },
  baseURL: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the 'updatedDate' field before saving the document
ShortVideoSchema.pre<IShortVideo>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const ShortVideo = mongoose.model<IShortVideo>("ShortVideo", ShortVideoSchema);

export { ShortVideo, IShortVideo };
