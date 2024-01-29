import mongoose,{ Document}from "mongoose";
import { Schema } from "mongoose";

export interface IUser extends Document{
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  email: string;
  password: string;
  phone: string | null;
  createdDate: Date;
  updatedDate: Date;
  path: string | null;
  baseUrl: string | null;
  coverPath: string | null;
  coverBaseUrl: string | null;
  termsAndCondition: boolean;
  isActive: boolean;
  googleLogin: boolean;
  facebookLogin: boolean;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, maxlength: 100 }, // Set maxlength to 100 characters
    lastName: { type: String, maxlength: 100 }, // Set maxlength to 100 characters
    userName: { type: String, maxlength: 100 },
    email: { type: String, required: true, maxlength: 100 },
    password: { type: String, required: true, maxlength: 255 },
    phone: { type: String, maxlength: 15 }, // Set maxlength to 100 characters
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    path: { type: String, maxlength: 255 }, // Set maxlength to 100 characters
    baseUrl: { type: String, maxlength: 100 }, // Set maxlength to 100 characters
    coverPath: { type: String, maxlength: 255 }, // Set maxlength to 100 characters
    coverBaseUrl: { type: String, maxlength: 100 }, // Set maxlength to 100 characters
    termsAndCondition: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    googleLogin: { type: Boolean, default: false },
    facebookLogin: { type: Boolean, default: false },
  }
);


const User = mongoose.model<IUser>("user", userSchema);

export { User };

