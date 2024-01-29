import mongoose, { Schema, Document } from "mongoose";

interface IMicroblogging extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  firstName: string;
  lastName: string;
  microModel: string;
  microId: mongoose.Types.ObjectId;
  MicrobloggingBio: string;
  baseURL: string;
  path: string;
  createdDate: Date;
  updatedDate: Date;
}

const MicrobloggingSchema: Schema<IMicroblogging> = new Schema<IMicroblogging>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  microModel: {
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
  microId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "microModel",
  },
  MicrobloggingBio: {
    type: String,
    required: false,
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
MicrobloggingSchema.pre<IMicroblogging>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const Microblogging = mongoose.model<IMicroblogging>(
  "Microblogging",
  MicrobloggingSchema
);

export { Microblogging, IMicroblogging };
