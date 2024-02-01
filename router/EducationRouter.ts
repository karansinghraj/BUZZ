import { Router } from "express";
import * as controller from "../util/File";

const EducationRoute = Router();

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
 *                status:
 *                 type: number
 *                 example: 200
 *                msg:
 *                 type: string
 *                 example: "success"
 *                data:
 *                  type: object
 *                  properties:
 *                   username:
 *                    type: string
 *                    example: "John Doe"
 *                   jobTitle:
 *                    type: string
 *                    example: "Software Engineer"
 *                   company:
 *                    type: string
 *                    example: "Tech"
 *                   industry:
 *                    type: string
 *                    example: "IT"
 *                   skills:
 *                    type: string
 *                    example: "javapython"
 *                   about:
 *                    type: string
 *                    example: "new opporunities"
 *                   example:
 *                    username: "John Doe"
 *                    jobTitle: "Software Engineer"
 *                    company: "Tech"
 *                    industry: "IT"
 *                    skills: "java ,python"
 *                    about: "new opporunities"
 *
 *
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
 *        MicrobloggingBio:
 *          type: string
 *        shortVidUsername:
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
 *               type: object
 *               properties:
 *                status:
 *                 type: number
 *                 example: 200
 *                message:
 *                 type: string
 *                 example: "Login Successfully"
 *                token:
 *                 type: string
 *                 example: "vsgdhxbd.bgsbddxb.gegddgd"
 *                 description: "Authentication token"
 *
 *
 *        '401':
 *          description: Unauthorized
 *
 */

EducationRoute.post("/login", controller.loginUser);

/**
 * @swagger
 * /Api/user/education/allclient:
 *   get:
 *     summary: Get Education Client Profile
 *     description: Retrieve education client profiles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pageIndex
 *         in: query
 *         description: Page index for pagination
 *         required: false
 *         type: integer
 *         default: 0
 *       - name: pageSize
 *         in: query
 *         description: Page size for pagination
 *         required: false
 *         type: integer
 *         default: 4
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              status:
 *               type: string
 *               example: "401"
 *              msg:
 *               type: string
 *               example: "Eduaction client profile"
 *              data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   firstname:
 *                     type: string
 *                     example: "John"
 *                   lastname:
 *                     type: string
 *                     example: "Doe"
 *                   username:
 *                     type: string
 *                     example: "johndoe"
 *                   location:
 *                     type: string
 *                     example: "City, Country"
 *                   profileimage:
 *                     type: string
 *                     example: "https://example.com/images/johndoe.jpg"
 *                   about:
 *                     type: string
 *                     example: "A brief description about John Doe"
 *       "401":
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              status:
 *               type: string
 *               example: "401"
 *              msg:
 *               type: string
 *               example: "Unauthorized request"
 *              data:
 *               type: null
 *       "404":
 *         description: User not found
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              status:
 *               type: string
 *               example: "404"
 *              msg:
 *               type: string
 *               example: "User does not exist"
 *              data:
 *               type: null
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "500"
 *                 msg:
 *                   type: string
 *                   example: "Internal Error"
 *                 data:
 *                   type: null
 */

EducationRoute.get("/education/allclient", controller.GetAllClient);

export { EducationRoute };
