import mongoose, { Schema, Document } from "mongoose";

interface IEdSkills extends Document {
  userId: mongoose.Types.ObjectId;
  isMaths: boolean;
  maths: string;
  isComputer: boolean;
  computer: string;
  isScience: boolean;
  science: string;
  isBusiness: boolean;
  business: string;
  isLanguage: boolean;
  language: string;
  isHistory: boolean;
  history: string;
  isTestPrep: boolean;
  testPrep: string;
  isMusic: boolean;
  music: string;
  isElementaryEd: boolean;
  elementaryEd: string;
  isArt: boolean;
  art: string;
  isSpecialNeeds: boolean;
  specialNeeds: string;
  createdDate: Date;
  updatedDate: Date;
}

const EdSkillsSchema: Schema<IEdSkills> = new Schema<IEdSkills>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming your User collection has this name
    required: true,
  },
  isMaths: { type: Boolean, default: false },
  maths: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isMaths;
    },
  },
  isComputer: { type: Boolean, default: false },
  computer: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isComputer;
    },
  },
  isScience: { type: Boolean, default: false },
  science: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isScience;
    },
  },
  isBusiness: { type: Boolean, default: false },
  business: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isBusiness;
    },
  },
  isLanguage: { type: Boolean, default: false },
  language: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isLanguage;
    },
  },
  isHistory: { type: Boolean, default: false },
  history: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isHistory;
    },
  },
  isTestPrep: { type: Boolean, default: false },
  testPrep: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isTestPrep;
    },
  },
  isMusic: { type: Boolean, default: false },
  music: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isMusic;
    },
  },
  isElementaryEd: { type: Boolean, default: false },
  elementaryEd: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isElementaryEd;
    },
  },
  isArt: { type: Boolean, default: false },
  art: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isArt;
    },
  },
  isSpecialNeeds: { type: Boolean, default: false },
  specialNeeds: {
    type: String,
    required: function (this: IEdSkills) {
      return this.isSpecialNeeds;
    },
  },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

// Middleware to update the 'updatedDate' field before saving the document
EdSkillsSchema.pre<IEdSkills>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const EdSkills = mongoose.model<IEdSkills>("EdSkills", EdSkillsSchema);

export { EdSkills, IEdSkills };
