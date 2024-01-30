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
exports.EducationRoute = void 0;
const express_1 = require("express");
const controller = __importStar(require("../util/File"));
const EducationRoute = (0, express_1.Router)();
exports.EducationRoute = EducationRoute;
/**
 * @swagger
 * tags:
 *   name: Education Section
 *
 */
/**
 * @swagger
 *
 * /Api/user/education/detail:
 *   get:
 *     tags: [Employee]
 *     name: Education section
 *     summary: Education Account
 *     description: Api for getting education detail
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: id
 *         description: User ID is required
 *         schema:
 *           type: string
 *
 *
 *     responses:
 *       200:
 *         description: To test the get method
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *               status:
 *                type: number
 *                example: 200
 *               msg:
 *                type: string
 *                example: "success"
 *               data:
 *                schema:
 *                 type: object
 *                 example:
 *                 properties:
 *                  username:
 *                   type: string
 *                   example: "John Doe"
 *                  jobTitle:
 *                   type: string
 *                   example: "Software Engineer"
 *                  company:
 *                   type: string
 *                   example: "Tech"
 *                  industry:
 *                   type: string
 *                   example: "IT"
 *                  skills:
 *                   type: string
 *                   example: "java ,python"
 *                  about:
 *                   type: string
 *                   example: "new opporunities"
 *
 *       401:
 *         description: Unauthorized Request
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *               status:
 *                type: number
 *               msg:
 *                type: string
 *               data:
 *                type: null
 *
 *       404:
 *         description: Not Found
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              status:
 *               type: number
 *              msg:
 *               type: string
 *              data:
 *               type: string
 *
 *
 * components:
 *  schemas:
 *    data:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        jobTitle:
 *          type: string
 *        company:
 *          type: string
 *        industry:
 *          type: string
 *        skills:
 *          type: string
 *        about:
 *          type: string
 *
 */
EducationRoute.get("/education/detail", controller.GetAccountDetail);
/**
 * @swagger
 * /Api/user/education/employee:
 *    post:
 *      tags: [Employee]
 *      summary: Create a new profile
 *      description: Api to Create Employee Profile in Education
 *      security:
 *       - bearerAuth: []
 *
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *
 *
 *      responses:
 *        '200':
 *          description: User profile created successfully
 *          content:
 *            application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: number
 *                 message:
 *                  type: string
 *                 data:
 *                  type: null
 *
 *        '400':
 *          description: Invalid request payload
 *
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        location:
 *          type: string
 *        jobTitle:
 *          type: string
 *        company:
 *          type: string
 *        industry:
 *          type: string
 *        skills:
 *          type: string
 *        educationDegree:
 *          type: string
 *        educationInstitution:
 *          type: string
 *        educationGradYear:
 *          type: string
 *        about:
 *          type: string
 *
 */
EducationRoute.post("/education/employee", controller.AddEmployee);
/**
 * @swagger
 * /Api/user/education/company:
 *    post:
 *      tags: [Company]
 *      summary: Create a new company profile
 *      description: API to create a profile for an education company
 *      security:
 *       - bearerAuth: []
 *
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/company'
 *
 *
 *      responses:
 *        '200':
 *          description: Company profile created successfully
 *          content:
 *            application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: number
 *                 message:
 *                  type: string
 *                 data:
 *                  type: null
 *
 *        '400':
 *         description: Bad Request
 *         content:
 *            application/json:
 *              schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: number
 *                 message:
 *                  type: string
 *                 data:
 *                  type: null
 *
 *
 * components:
 *  schemas:
 *    company:
 *      type: object
 *      properties:
 *        companyName:
 *          type: string
 *        typeOfBusiness:
 *          type: string
 *        industrySector:
 *          type: string
 *        companySize:
 *          type: string
 *        location:
 *          type: string
 *        MicrobloggingBio:
 *          type: string
 *        shortVidUsername:
 *          type: string
 *        websiteURL:
 *          type: string
 *        about:
 *          type: string
 *
 */
EducationRoute.post("/education/company", controller.AddCompany);
/**
 *
 * @swagger
 *  /Api/user/login:
 *    post:
 *      summary: Authenticate user
 *      description: Api for user login
 *
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                UserName:
 *                 type: string
 *                Password:
 *                 type: string
 *                 description: User password
 *
 *      responses:
 *        '200':
 *          description: Successful login
 *          content:
 *            application/json:
 *              schema:
 *              type: object
 *              properties:
 *               status:
 *                type: number
 *               message:
 *                type: string
 *               token:
 *                type: string
 *                description: Authentication token
 *
 *        '401':
 *          description: Unauthorized
 *
 */
EducationRoute.post("/login", controller.loginUser);
