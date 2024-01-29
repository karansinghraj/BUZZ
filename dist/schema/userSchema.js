"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
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
});
const User = mongoose_1.default.model("user", userSchema);
exports.User = User;
