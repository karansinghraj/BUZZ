import mongoose, { Schema, Document } from "mongoose";

interface IEdEmployee extends Document {
  userId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  jobTitle: string;
  location: string;
  companyName?: string; // This field is optional
  industrySector: string;
  baseURL: string;
  path: string;
  skill: string;
  educationDegree: string;
  educationInstitution: string;
  gradYear: string;
  about: string;
  createdDate: Date;
  updatedDate: Date;
}

const EdEmployeeSchema: Schema<IEdEmployee> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: false, // Setting this as optional
  },
  industrySector: {
    type: String,
    required: true,
  },
  baseURL: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  educationDegree: {
    type: String,
    required: true,
  },
  educationInstitution: {
    type: String,
    required: true,
  },
  gradYear: {
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
EdEmployeeSchema.pre<IEdEmployee>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const EdEmployee = mongoose.model<IEdEmployee>("EdEmployee", EdEmployeeSchema);

export { EdEmployee, IEdEmployee };
