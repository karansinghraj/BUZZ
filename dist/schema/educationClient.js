"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const EducationClient = new mongoose_2.default.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, maxlength: 100 },
    lastName: { type: String, required: true, maxlength: 100 },
    location: { type: String, required: true, maxlength: 200 },
    path: { type: String, maxlength: 200 },
    baseUrl: { type: String, maxlength: 200 },
    about: { type: String, maxlength: 300 },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});
const Client = mongoose_2.default.model("EducationClient", EducationClient);
exports.Client = Client;
