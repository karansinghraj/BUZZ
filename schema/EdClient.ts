import mongoose, { Schema, Document } from "mongoose";

interface IEdClient extends Document {
  userId: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  location: string;
  baseURL: string;
  path: string;
  about: string;
  createdDate: Date;
  updatedDate: Date;
}

const EdClientSchema: Schema<IEdClient> = new Schema({
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
  about: {
    type: String,
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

// Middleware to update the 'updatedDate' field before saving the document
EdClientSchema.pre<IEdClient>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const EdClient = mongoose.model<IEdClient>("EdClient", EdClientSchema);

export { EdClient, IEdClient };
