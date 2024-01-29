import { EdFreelancer } from "../schema/EdFreelancer";
import { EdCompany } from "../schema/EdCompany";
import { EdClient } from "../schema/EdClient";
import { EdEmployee } from "../schema/EdEmployee";
import { User } from "../schema/UserSchema";
import { Education, IEducation } from "../schema/EdAccount";
import {
  AddEmployee,
  GetAccountDetail,
  AddCompany,
} from "../controller/EducationController";
import { loginUser } from "../controller/LoginController";
import {
  AddEdEmployee,
  GetEducationAccount,
  AddEdCompany,
} from "../services/UserServices";
import { Microblogging } from "../schema/microbloggingBio";
import { ShortVideo } from "../schema/shortVidusername";
import { LastEdAccount } from "../schema/LastEdaccount";

export {
  EdFreelancer,
  EdCompany,
  EdClient,
  EdEmployee,
  User,
  Education,
  Microblogging,
  IEducation,
  ShortVideo,
  LastEdAccount,
  AddEmployee,
  AddCompany,
  GetAccountDetail,
  loginUser,
  AddEdEmployee,
  GetEducationAccount,
  AddEdCompany,
};

// const uuidv4 = require("uuid").v4;
// import jwt from "jsonwebtoken";
// import { Request, Response } from "express";

// //Values
// import {
//   awsBucket,
//   key,
//   s3,
//   SUCCESS_MESSAGES,
//   ERROR_MESSAGES,
// } from "../utils/Values";

// //Helper functions
// import {
//   generateUsername,
//   removeS3Image,
//   uploads3Image,
//   getName,
//   getProfileImage,
// } from "../utils/helper";

// //Models
// import { GetProfile, ClientModel } from "../models/EducationProfile";
// import { ApiResponse } from "../models/APIResponse";

// //Schema
// import * as context from "../schema/Context";

// //API Logic

// async function GetEducationAccount(
//   req: Request
// ): Promise<ApiResponse<GetProfile>> {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   // Check if the user is authorized
//   if (!token) {
//     return {
//       status: 401,
//       message: "Unauthorized",
//       data: null,
//     };
//   }

//   const decoded = jwt.verify(token, key);
//   if (!decoded || !decoded.sub) {
//     return {
//       status: 401,
//       message: "Unauthorized",
//       data: null,
//     };
//   }
//   const userId = decoded.sub;
//   try {
//     const user = await context.User.findOne({ _id: userId, isActive: true })
//       .maxTimeMS(20000)
//       .exec();
//     if (!user) {
//       return {
//         status: 404,
//         message: "User doesn't exist",
//         data: null,
//       };
//     }
//     const education = await context.Education.findOne({ userId: userId })
//       .maxTimeMS(20000)
//       .exec();
//     if (!education) {
//       return {
//         status: 404,
//         message: "User doesn't have education account",
//         data: null,
//       };
//     }
//     let data: GetProfile = {
//       fullName: null,
//       profilePicture: null,
//       userName: education.username,
//       accountType: null,
//     };
//     if (education.isClient) {
//       const client = await context.EdClient.findOne({ userId })
//         .maxTimeMS(20000)
//         .exec();
//       if (!client) {
//         return {
//           status: 404,
//           message: "Client account is not created for this user",
//           data: null,
//         };
//       }
//       data.fullName = getName(client?.firstName, client?.lastName);
//       data.profilePicture = getProfileImage(client.baseURL, client.path);
//       data.accountType = "Client";
//     }
//     if (education.isCompany) {
//       const company = await context.EdCompany.findOne({ userId })
//         .maxTimeMS(20000)
//         .exec();
//       if (!company) {
//         return {
//           status: 404,
//           message: "Company account is not created for this user",
//           data: null,
//         };
//       }
//       data.fullName = getName(company.companyName, "");
//       data.profilePicture = getProfileImage(
//         company.companyLogoBaseURL,
//         company.companyLogoPath
//       );
//       data.accountType = "Company";
//     }
//     if (education.isEmployee) {
//       const employee = await context.EdEmployee.findOne({ userId })
//         .maxTimeMS(20000)
//         .exec();
//       if (!employee) {
//         return {
//           status: 404,
//           message: "Employee account is not created for this user",
//           data: null,
//         };
//       }
//       data.fullName = getName(employee.firstName, employee.lastName);
//       data.profilePicture = getProfileImage(employee.baseURL, employee.path);
//       data.accountType = "Employee";
//     }
//     if (education.isFreelancer) {
//       const freelancer = await context.EdFreelancer.findOne({ userId })
//         .maxTimeMS(20000)
//         .exec();
//       if (!freelancer) {
//         return {
//           status: 404,
//           message: "Freelancer account is not created for this user",
//           data: null,
//         };
//       }
//       data.fullName = getName(freelancer.firstName, freelancer.lastName);
//       data.profilePicture = getProfileImage(
//         freelancer.baseURL,
//         freelancer.path
//       );
//       data.accountType = "Freelancer";
//     }
//     return {
//       status: 200,
//       message: SUCCESS_MESSAGES.SUCCESS,
//       data: data,
//     };
//   } catch (error: any) {
//     console.log(error.message);
//     return {
//       status: 500,
//       message: ERROR_MESSAGES.INTERNAL_SERVER,
//       data: null,
//     };
//   }
// }

// async function CreateEducationClient(
//   req: Request,
//   model: ClientModel
// ): Promise<ApiResponse<any>> {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   // Check if the user is authorized
//   if (!token) {
//     return {
//       status: 401,
//       message: "Unauthorized",
//       data: null,
//     };
//   }

//   const decoded = jwt.verify(token, key);
//   if (!decoded || !decoded.sub) {
//     return {
//       status: 401,
//       message: "Unauthorized",
//       data: null,
//     };
//   }
//   const userId = decoded.sub;
//   const {
//     firstName,
//     lastName,
//     location,
//     about,
//     MicrobloggingBio,
//     ShortVideosUsername,
//   } = model;
//   if (
//     !firstName ||
//     !lastName ||
//     !location ||
//     !about ||
//     !MicrobloggingBio ||
//     !ShortVideosUsername
//   ) {
//     return {
//       status: 400,
//       message: "Need all the details of Client",
//       data: null,
//     };
//   }
//   const filePath = req.file?.buffer;
//   let imageBaseUrl = "";
//   let imagepath = "";
//   try {
//     const user = await context.User.findOne({ _id: userId, isActive: true })
//       .maxTimeMS(20000)
//       .exec();
//     if (!user) {
//       return {
//         status: 404,
//         message: "User doesn't exist",
//         data: null,
//       };
//     }
//     const education = await context.Education.findOne({ userId })
//       .maxTimeMS(20000)
//       .exec();
//     if (education) {
//       return {
//         status: 400,
//         message: "User already has an education account",
//         data: null,
//       };
//     }
//     const educationClient = await context.EdClient.findOne({ userId })
//       .maxTimeMS(20000)
//       .exec();
//     if (educationClient) {
//       return {
//         status: 400,
//         message: "User already has a Client type education account",
//         data: null,
//       };
//     }
//     if (filePath) {
//       const fileBuffer = req.file?.buffer;
//       const fileExtension = req.file?.mimetype.split("/")[1]; // Extract file extension from MIME type
//       const uniqueKey = uuidv4();
//       const key = `${userId}/Education/Profile/Image/${uniqueKey}.${fileExtension}`;

//       //Call the upload s3 logic
//       await uploads3Image(key, fileBuffer);
//       const base_url = `https://${awsBucket}.s3.amazonaws.com`;
//       const file_path = key;
//       imagepath = file_path;
//       imageBaseUrl = base_url;
//     }

//     //Create a new Client
//     const newClient = new context.EdClient({
//       userId,
//       firstName,
//       lastName,
//       location,
//       baseURL: imageBaseUrl,
//       path: imagepath,
//       about,
//       createdDate: new Date(),
//       updatedDate: new Date(),
//     });

//     // Save the newly created client document
//     const createdClient = await newClient.save();
//     const userName = generateUsername(firstName, lastName);
//     if (!createdClient) {
//       return {
//         status: 500,
//         message: "Coudn't create client with current details",
//         data: null,
//       };
//     }

//     // Create an Education document using the newly created employee's _id
//     const newEducation = new context.Education({
//       userId: userId,
//       username: userName,
//       isClient: true,
//       isEmployee: false,
//       isFreelancer: false,
//       isCompany: false,
//       MicrobloggingBio,
//       ShortVideosUsername,
//       createdDate: new Date(),
//       updatedDate: new Date(),
//     });

//     // Save the Education document
//     const newEd = await newEducation.save();

//     //Create Microblogging account
//     const microblog = new context.Microblogging({
//       userId,
//       userName,
//       firstName,
//       lastName,
//       microModel: "Education",
//       microId: newEd._id,
//       MicrobloggingBio,
//       baseURL: imageBaseUrl,
//       path: imagepath,
//     });
//     await microblog.save();

//     const shortVid = new context.ShortVideo({
//       userId,
//       fullName: getName(firstName, lastName),
//       username: ShortVideosUsername,
//       shortModel: "Education",
//       shortId: newEd._id,
//       baseURL: imageBaseUrl,
//       path: imagepath,
//     });
//     await shortVid.save();

//     return {
//       status: 200,
//       message: SUCCESS_MESSAGES.ADD_SUCCESS,
//       data: createdClient,
//     };
//   } catch (error: any) {
//     console.log(error.message);
//     return {
//       status: 500,
//       message: ERROR_MESSAGES.INTERNAL_SERVER,
//       data: null,
//     };
//   }
// }

// export { GetEducationAccount, CreateEducationClient };
