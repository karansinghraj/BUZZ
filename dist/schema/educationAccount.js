"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationAccount = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const EducationAcc = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    employee: { type: Boolean, default: false, required: true },
    client: { type: Boolean, default: false, required: true },
    company: { type: Boolean, default: false, required: true },
    freelancer: { type: Boolean, default: false, required: true },
    MicrobloggingBio: { type: String },
    ShortVidUsername: { type: String },
    createdate: { type: Date, default: Date.now },
    updatedate: { type: Date, default: Date.now },
});
const EducationAccount = mongoose_2.default.model("EducationAccount", EducationAcc);
exports.EducationAccount = EducationAccount;
