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
exports.Education = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const EducationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
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
EducationSchema.pre("save", function (next) {
    this.updatedDate = new Date();
    next();
});
const Education = mongoose_1.default.model("Education", EducationSchema);
exports.Education = Education;
