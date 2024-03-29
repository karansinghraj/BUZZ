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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEducationClientprofile = exports.AddEdCompany = exports.AddEdEmployee = exports.GetEducationAccount = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DBservices = __importStar(require("../util/File"));
const helper_1 = require("../util/helper");
const SecretKey = "Secret_key";
function getImageUrl(baseurl, path) {
    return baseurl + "/" + path;
}
function GetEducationAccount(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const Authheader = req.headers["authorization"];
        const Token = Authheader && Authheader.split(" ")[1];
        if (!Token) {
            return {
                status: 401,
                msg: "Unauthorized Request",
                data: null,
            };
        }
        try {
            const decode = yield jsonwebtoken_1.default.verify(Token, SecretKey);
            const userid = decode.sub;
            if (!decode || !decode.sub) {
                return {
                    status: 401,
                    msg: "Unauthorized request",
                    data: null,
                };
            }
            const user = yield DBservices.User.findOne({ _id: userid });
            if (user === null) {
                return {
                    status: 401,
                    msg: "User does not exist",
                    data: null,
                };
            }
            const Fullname = yield (0, helper_1.fullname)(user.firstName, user.lastName);
            let lastAccount = yield DBservices.LastEdAccount.findOne({
                userId: userid,
            });
            if (!lastAccount) {
                return {
                    status: 404,
                    msg: "No Education Account",
                    data: null,
                };
            }
            let Data = {
                userName: null,
                fullName: null,
                accountType: null,
                accountId: null,
                profileImage: null,
            };
            const EducationAcc = yield DBservices.Education.findOne({
                _id: lastAccount.edAccountId,
            });
            Data.userName = EducationAcc.userName;
            Data.accountType = EducationAcc.eduactionModel;
            Data.fullName = Fullname;
            if (EducationAcc.isEmployee) {
                const data = yield DBservices.EdEmployee.findOne({ userId: userid });
                if (!data) {
                    return {
                        status: 404,
                        msg: "Employee Account doesn't exist",
                        data: null,
                    };
                }
                Data.profileImage = data.baseURL + "/" + data.path;
                Data.accountId = data._id;
            }
            if (EducationAcc.isClient) {
                const data = yield DBservices.EdClient.findOne({ userId: userid });
                if (!data) {
                    return {
                        status: 204,
                        msg: "Client Account doesn't exist",
                        data: null,
                    };
                }
                Data.profileImage = data.baseURL + "/" + data.path;
                Data.accountId = data._id;
            }
            if (EducationAcc.isCompany) {
                const data = yield DBservices.EdCompany.findOne({ userId: userid });
                if (!data) {
                    return {
                        status: 404,
                        msg: "Company Account doesn't exist",
                        data: null,
                    };
                }
                Data.profileImage = data.companyLogoBaseURL + "/" + data.companyLogoPath;
                Data.accountId = data._id;
            }
            if (EducationAcc.isFreelancer) {
                const data = yield DBservices.EdFreelancer.findOne({
                    userId: userid,
                });
                if (!data) {
                    return {
                        status: 404,
                        msg: "Freelancer Account doesn't exist",
                        data: null,
                    };
                }
                Data.profileImage = data.baseURL + "/" + data.path;
                Data.accountId = data._id;
            }
            return {
                status: 200,
                msg: "SUCCESS",
                data: Data,
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                msg: "Internal Server Error",
                data: null,
            };
        }
    });
}
exports.GetEducationAccount = GetEducationAccount;
function AddEdEmployee(req, model) {
    return __awaiter(this, void 0, void 0, function* () {
        const Authheader = req.headers["authorization"];
        const Token = Authheader && Authheader.split(" ")[1];
        if (!Token) {
            return {
                status: 401,
                msg: "Unauthorized Request",
                data: null,
            };
        }
        const { firstName, lastName, location, jobTitle, company, industry, skills, educationDegree, educationInstitution, educationGradYear, microbloggingBio, shortVidUsername, about, } = model;
        if (!firstName ||
            !lastName ||
            !location ||
            !jobTitle ||
            !company ||
            !industry ||
            !skills ||
            !educationDegree ||
            !educationInstitution ||
            !educationGradYear) {
            return {
                status: 400,
                msg: "Incomplete Details",
                data: null,
            };
        }
        try {
            const decode = yield jsonwebtoken_1.default.verify(Token, SecretKey);
            const userid = decode.sub;
            if (!decode || !decode.sub) {
                return {
                    status: 401,
                    msg: "Unauthorized request",
                    data: null,
                };
            }
            const user = yield DBservices.User.findOne({
                _id: userid,
                isActive: true,
            });
            if (!user) {
                return {
                    status: 404,
                    msg: "User does not exist",
                    data: null,
                };
            }
            const oldemployee = yield DBservices.EdEmployee.findOne({
                userId: user._id,
            });
            if (oldemployee) {
                return {
                    status: 404,
                    msg: "Employee account exist already",
                    data: null,
                };
            }
            const Fullname = (0, helper_1.fullname)(firstName, lastName);
            let baseUrl = " sdc/";
            let path = " cds";
            const employee = yield DBservices.EdEmployee.create({
                userId: user._id,
                firstName,
                lastName,
                location: location,
                jobTitle: jobTitle,
                company: company,
                industrySector: industry,
                skill: skills,
                educationDegree: educationDegree,
                educationInstitution: educationInstitution,
                gradYear: educationGradYear,
                about: about,
                baseURL: baseUrl,
                path: path,
            });
            const education = yield DBservices.Education.create({
                userId: userid,
                userName: yield Fullname,
                isEmployee: true,
                eduactionModel: "Employee",
                edAccountId: employee._id,
                MicrobloggingBio: microbloggingBio,
                ShortVidUsername: shortVidUsername,
            });
            const Addmicroblogging = yield DBservices.Microblogging.create({
                userId: userid,
                firstName: firstName,
                lastName: lastName,
                baseURL: baseUrl,
                path: path,
                userName: yield Fullname,
                microId: education._id,
                microModel: "Education",
            });
            const Addshortvid = yield DBservices.ShortVideo.create({
                userId: userid,
                fullName: yield Fullname,
                userName: shortVidUsername,
                shortId: education._id,
                shortModel: "Education",
                baseURL: baseUrl,
                path: path,
            });
            let lastAccount = yield DBservices.LastEdAccount.findOne({
                userId: userid,
            });
            if (!lastAccount) {
                lastAccount = new DBservices.LastEdAccount();
            }
            lastAccount.userId = userid;
            lastAccount.edAccountId = education._id;
            yield lastAccount.save();
            return {
                status: 200,
                msg: "SUCCESS",
                data: "Account Created",
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Invalid Error",
                data: null,
            };
        }
    });
}
exports.AddEdEmployee = AddEdEmployee;
function AddEdCompany(req, model) {
    return __awaiter(this, void 0, void 0, function* () {
        const Authheader = req.headers["authorization"];
        const Token = Authheader && Authheader.split(" ")[1];
        if (!Token) {
            return {
                status: 401,
                msg: "Unauthorized Request",
                data: null,
            };
        }
        const { companyName, typeOfBusiness, industrySector, companySize, location, websiteURL, microbloggingBio, shortVidUsername, about, } = model;
        if (!companyName ||
            !typeOfBusiness ||
            !industrySector ||
            !companySize ||
            !location ||
            !websiteURL ||
            !about) {
            return {
                status: 400,
                msg: "Incomplete Details",
                data: null,
            };
        }
        try {
            const decode = yield jsonwebtoken_1.default.verify(Token, SecretKey);
            const userid = decode.sub;
            if (!decode || !decode.sub) {
                return {
                    status: 401,
                    msg: "Unauthorized request",
                    data: null,
                };
            }
            const user = yield DBservices.User.findOne({
                _id: userid,
                isActive: true,
            });
            if (user === null) {
                return {
                    status: 404,
                    msg: "User does not exist",
                    data: null,
                };
            }
            const checkcompany = yield DBservices.EdCompany.findOne({
                userId: user._id,
            });
            if (checkcompany) {
                return {
                    status: 400,
                    msg: "Company account already exist",
                    data: null,
                };
            }
            const Fullname = yield (0, helper_1.fullname)(user.firstName, user.lastName);
            let baseUrl = " ";
            let path = " ";
            const company = yield DBservices.EdCompany.create({
                userId: userid,
                companyName: companyName,
                typeOfBusiness: typeOfBusiness,
                industrySector: industrySector,
                companySize: companySize,
                websiteURL: websiteURL,
                location: location,
                about: about,
                companyLogoBaseURL: baseUrl,
                companyLogoPath: path,
            });
            const education = yield DBservices.Education.create({
                userId: userid,
                userName: Fullname,
                isCompany: true,
                edAccountId: company._id,
                eduactionModel: "Company",
                MicrobloggingBio: microbloggingBio,
                ShortVidUsername: shortVidUsername,
            });
            let lastAccount = yield DBservices.LastEdAccount.findOne({
                userId: userid,
            });
            if (!lastAccount) {
                lastAccount = new DBservices.LastEdAccount();
            }
            lastAccount.userId = userid;
            lastAccount.edAccountId = education._id;
            yield lastAccount.save();
            const Addmicroblogging = yield DBservices.Microblogging.create({
                userId: userid,
                userName: companyName,
                firstName: user.firstName,
                lastName: user.lastName,
                baseURL: baseUrl,
                path: path,
                microId: education._id,
                microModel: "Education",
            });
            let lastMicroBlogAccount = yield DBservices.LastMicroBlogAccount.findOne({
                userId: userid,
            });
            if (!lastMicroBlogAccount) {
                lastMicroBlogAccount = new DBservices.LastMicroBlogAccount();
            }
            lastMicroBlogAccount.userId = userid;
            lastMicroBlogAccount.edAccountId = education._id;
            yield lastMicroBlogAccount.save();
            const Addshortvid = yield DBservices.ShortVideo.create({
                userId: userid,
                fullName: companyName,
                userName: shortVidUsername,
                shortId: education._id,
                shortModel: "Education",
                baseURL: baseUrl,
                path: path,
            });
            let lastShortVidAccount = yield DBservices.LastShortVid.findOne({
                userId: userid,
            });
            if (!lastShortVidAccount) {
                lastShortVidAccount = new DBservices.LastShortVid();
            }
            lastShortVidAccount.userId = userid;
            lastShortVidAccount.edAccountId = education._id;
            yield lastShortVidAccount.save();
            return {
                status: 200,
                msg: "SUCCESS",
                data: "Education Company Account Created",
            };
        }
        catch (error) {
            console.log(error);
            return {
                status: 500,
                message: "Invalid Error",
                data: null,
            };
        }
    });
}
exports.AddEdCompany = AddEdCompany;
function GetEducationClientprofile(req, model) {
    return __awaiter(this, void 0, void 0, function* () {
        const Authheader = req.headers["authorization"];
        const Token = Authheader && Authheader.split(" ")[1];
        if (!Token) {
            return {
                status: 401,
                msg: "Unauthorized 1 Request",
                data: null,
            };
        }
        const { pageIndex = 0, pageSize = 4, } = model;
        try {
            const decode = yield jsonwebtoken_1.default.verify(Token, SecretKey);
            const userId = decode.sub;
            if (!decode || !decode.sub) {
                return {
                    status: 401,
                    msg: "Unauthorized  1 request",
                    data: null,
                };
            }
            const user = yield DBservices.User.findOne({
                _id: userId,
                isActive: true,
            });
            if (user === null) {
                return {
                    status: 404,
                    msg: "User does not exist",
                    data: null,
                };
            }
            const EdClientProfile = yield DBservices.Education.find({
                userId: { $ne: userId },
                isClient: true,
                eduactionModel: "Client",
            })
                .populate({
                path: "edAccountId",
                model: "edModel",
                select: "_id lastname firstname location baseurl path location ",
            })
                .sort({ createdDate: -1 }) // descending higher to lower date
                .skip(pageIndex * pageSize)
                .limit(pageSize)
                .exec();
            if (EdClientProfile.length === 0) {
                return {
                    status: 404,
                    msg: "Not Found",
                    data: null,
                };
            }
            const totalcount = yield DBservices.Education.find({
                userId: { $ne: userId },
            });
            const result = yield EdClientProfile.map((profile) => {
                return {
                    firstname: profile.edAccountId.firstName,
                    lastname: profile.edAccountId.lastName,
                    username: profile.userName,
                    location: profile.edAccountId.location,
                    profileimage: getImageUrl(profile.edAccountId.baseURL, profile.edAccountId.path),
                    about: profile.edAccountId.about,
                };
            });
            return {
                status: 200,
                msg: "Eduaction client profile",
                data: result,
            };
        }
        catch (error) {
            return {
                status: 500,
                msg: "Internal Error",
                data: null,
            };
        }
    });
}
exports.GetEducationClientprofile = GetEducationClientprofile;
