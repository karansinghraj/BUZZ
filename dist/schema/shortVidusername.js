"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortVideo = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ShortVideoSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User", // Assuming "User" is the referenced model name
    },
    fullName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    shortModel: {
        type: String,
        required: true,
        enum: [
            "ITProfileType",
            "Education",
            "Agriculture",
            "Transport",
            "ArtDesign",
            "Financial",
            "Hospitality",
            "Environmental",
            "Construction",
            "RealEstate",
            "ProfessionalServices",
            "GeneralMerchandise",
        ],
    },
    shortId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "EducationAccount",
    },
    baseURL: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
});
// Middleware to update the 'updatedDate' field before saving the document
ShortVideoSchema.pre("save", function (next) {
    this.updatedDate = new Date();
    next();
});
const ShortVideo = mongoose_1.default.model("ShortVideo", ShortVideoSchema);
exports.ShortVideo = ShortVideo;
