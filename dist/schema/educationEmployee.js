"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const EducationEmployee = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, maxlength: 250 },
    lastName: { type: String, required: true, maxlength: 100 },
    location: { type: String, required: true, maxlength: 200 },
    jobTitle: { type: String, required: true, maxlength: 200 },
    industry: { type: String, required: true, maxlength: 200 },
    skills: { type: String, required: true, maxlength: 200 },
    educationDegree: { type: String, required: true, maxlength: 200 },
    educationInstitution: { type: String, required: true, maxlength: 200 },
    educationGradYear: { type: String, required: true, maxlength: 200 },
    path: { type: String, maxlength: 200 },
    baseUrl: { type: String, maxlength: 200 },
    about: { type: String, maxlength: 300 },
});
const Employee = mongoose_2.default.model("EducationEmployee", EducationEmployee);
exports.Employee = Employee;
