import mongoose, { Schema } from "mongoose";

interface ILastEdAccount extends Document {
  userId: string | null;
  edAccountId: mongoose.Types.ObjectId;
  createdDate: Date;
  updatedDate: Date;
}

const lastEdAccount: Schema<ILastEdAccount> = new Schema({
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

lastEdAccount.pre<ILastEdAccount>("save", function (next) {
  this.updatedDate = new Date();
  next();
});

const LastEdAccount = mongoose.model<ILastEdAccount>(
  "lastedaccount",
  lastEdAccount
);

export { LastEdAccount, ILastEdAccount };
