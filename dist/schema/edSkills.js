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
exports.EdSkills = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const EdSkillsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User", // Assuming your User collection has this name
        required: true,
    },
    isMaths: { type: Boolean, default: false },
    maths: {
        type: String,
        required: function () {
            return this.isMaths;
        },
    },
    isComputer: { type: Boolean, default: false },
    computer: {
        type: String,
        required: function () {
            return this.isComputer;
        },
    },
    isScience: { type: Boolean, default: false },
    science: {
        type: String,
        required: function () {
            return this.isScience;
        },
    },
    isBusiness: { type: Boolean, default: false },
    business: {
        type: String,
        required: function () {
            return this.isBusiness;
        },
    },
    isLanguage: { type: Boolean, default: false },
    language: {
        type: String,
        required: function () {
            return this.isLanguage;
        },
    },
    isHistory: { type: Boolean, default: false },
    history: {
        type: String,
        required: function () {
            return this.isHistory;
        },
    },
    isTestPrep: { type: Boolean, default: false },
    testPrep: {
        type: String,
        required: function () {
            return this.isTestPrep;
        },
    },
    isMusic: { type: Boolean, default: false },
    music: {
        type: String,
        required: function () {
            return this.isMusic;
        },
    },
    isElementaryEd: { type: Boolean, default: false },
    elementaryEd: {
        type: String,
        required: function () {
            return this.isElementaryEd;
        },
    },
    isArt: { type: Boolean, default: false },
    art: {
        type: String,
        required: function () {
            return this.isArt;
        },
    },
    isSpecialNeeds: { type: Boolean, default: false },
    specialNeeds: {
        type: String,
        required: function () {
            return this.isSpecialNeeds;
        },
    },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});
// Middleware to update the 'updatedDate' field before saving the document
EdSkillsSchema.pre("save", function (next) {
    this.updatedDate = new Date();
    next();
});
const EdSkills = mongoose_1.default.model("EdSkills", EdSkillsSchema);
exports.EdSkills = EdSkills;
