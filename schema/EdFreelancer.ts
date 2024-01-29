import mongoose, { Schema, Document } from "mongoose";

interface IEdFreelancer extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  location: string;
  baseURL: string;
  path: string;
  summary: string;
  skillId: mongoose.Schema.Types.ObjectId; // Reference to Skill collection _id
  createdDate: Date;
  updatedDate: Date;
}

const EdFreelancerSchema: Schema<IEdFreelancer> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
  location: {
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
  summary: {
    type: String,
    required: true,
  },
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill", // Reference to Skill collection
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

// Middleware to update the 'updatedDate' field before saving the document
EdFreelancerSchema.pre<IEdFreelancer>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const EdFreelancer = mongoose.model<IEdFreelancer>(
  "EdFreelancer",
  EdFreelancerSchema
);

export { IEdFreelancer, EdFreelancer };
