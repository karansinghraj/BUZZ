import mongoose, { Schema, Document, Model } from "mongoose";

interface IEdCompany extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  typeOfBusiness: string;
  industrySector: string;
  companySize: string;
  location: string;
  companyLogoBaseURL: string;
  companyLogoPath: string;
  websiteURL: string;
  about: string;
  createdDate: Date;
  updatedDate: Date;
}

const EdCompanySchema: Schema<IEdCompany> = new Schema<IEdCompany>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  typeOfBusiness: {
    type: String,
    required: true,
  },
  industrySector: {
    type: String,
    required: true,
  },
  companySize: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  companyLogoBaseURL: {
    type: String,
    required: true,
  },
  companyLogoPath: {
    type: String,
    required: true,
  },
  websiteURL: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

// Middleware to update the 'updatedDate' field before saving the document
EdCompanySchema.pre<IEdCompany>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const EdCompany: Model<IEdCompany> = mongoose.model<IEdCompany>(
  "EdCompany",
  EdCompanySchema
);

export { EdCompany, IEdCompany };
