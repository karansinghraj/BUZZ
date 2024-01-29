"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const EducationCompany = new mongoose_2.default.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    comapanyname: { type: String, maxlength: 100, required: true },
    typeOfBusiness: { type: String, maxlength: 100 },
    industry: { type: String, maxlength: 100 },
    companySize: { type: String, maxlength: 100 },
    location: { type: String, maxlength: 100 },
    companyLogoBaseURL: { type: String, maxlength: 100 },
    companyLogoPath: { type: String, maxlength: 100 },
    websiteURL: { type: String, maxlength: 100 },
    about: { type: String, maxlength: 100 },
});
const Company = mongoose_2.default.model("EducationCompany", EducationCompany);
exports.Company = Company;
