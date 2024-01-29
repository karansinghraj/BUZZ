import mongoose, { Schema, Document } from "mongoose";

interface IEducation extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string | null;
  isClient: boolean;
  isEmployee: boolean;
  isFreelancer: boolean;
  isCompany: boolean;
  eduactionModel: string;
  edAccountId: mongoose.Types.ObjectId;
  MicrobloggingBio: string;
  ShortVideosUsername: string;
  createdDate: Date;
  updatedDate: Date;
}

const EducationSchema: Schema<IEducation> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User collection
    required: true,
  },

  userName: { type: String, required: true },
  isClient: {
    type: Boolean,
    default: false,
    required: true,
  },
  isEmployee: {
    type: Boolean,
    default: false,
    required: true,
  },
  isFreelancer: {
    type: Boolean,
    default: false,
    required: true,
  },
  isCompany: {
    type: Boolean,
    default: false,
    required: true,
  },
  eduactionModel: {
    type: String,
    required: true,
    enum: ["Employee", "Company", "Client", "Freelancer"],
  },
  edAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "educationModel",
  },
  MicrobloggingBio: {
    type: String,
    required: false,
  },
  ShortVideosUsername: {
    type: String,
    required: false,
  },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

//Middleware to update udatedDate value on save
EducationSchema.pre<IEducation>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const Education = mongoose.model<IEducation>("Education", EducationSchema);

export { Education, IEducation };
