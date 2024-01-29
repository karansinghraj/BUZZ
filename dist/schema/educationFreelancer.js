"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Freelancer = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const EducationFreelancer = new mongoose_2.default.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, maxlength: 250 },
    lastName: { type: String, required: true, maxlength: 100 },
    location: { type: String, required: true, maxlength: 200 },
    path: { type: String, maxlength: 200 },
    baseUrl: { type: String, maxlength: 200 },
    summary: { type: String, maxlength: 300 },
    skillid: { type: mongoose_1.Schema.Types.ObjectId, ref: "Skills", required: true },
});
const Freelancer = mongoose_2.default.model("EducationFreelancer", EducationFreelancer);
exports.Freelancer = Freelancer;
