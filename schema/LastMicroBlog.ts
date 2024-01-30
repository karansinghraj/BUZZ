import mongoose, { Schema } from "mongoose";

interface ILastMicroblog extends Document {
  userId: string | null;
  edAccountId: mongoose.Types.ObjectId;
  createdDate: Date;
  updatedDate: Date;
}

const lastMicroBlogAccount: Schema<ILastMicroblog> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User collection
    required: true,
  },
  edAccountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Education", // Reference to Education collection
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

lastMicroBlogAccount.pre<ILastMicroblog>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const LastMicroBlogAccount = mongoose.model<ILastMicroblog>(
  "lastedaccount",
  lastMicroBlogAccount
);

export { LastMicroBlogAccount, ILastMicroblog };
