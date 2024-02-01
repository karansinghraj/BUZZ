"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = void 0;
const JWT = require("jsonwebtoken");
const UserSchema_1 = require("../schema/UserSchema");
const bcrypt = require("bcrypt");
const SecretKey = "Secret_key";
// async function VerfiyPassword( Password:String , hashpassword:any):Promise<Boolean>{
//     const result =  await bcrypt.compare(Password,hashpassword)
//     return result;
// }
function UserLogin(model) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { UserName, Password } = model;
            if (!UserName || !Password) {
                return {
                    status: 400,
                    message: "Bad Request",
                    data: null,
                };
            }
            const user = yield UserSchema_1.User.findOne({ firstName: UserName, isActive: true });
            if (!user) {
                return {
                    status: 400,
                    message: "Bad request",
                    data: null,
                };
            }
            const hashpassword = user.password;
            if (!hashpassword) {
                return {
                    status: 400,
                    message: "user password is not there",
                    data: null,
                };
            }
            //const verification = await VerfiyPassword(Password,hashpassword)
            const verification = yield bcrypt.compare(Password, hashpassword);
            if (verification === false) {
                return {
                    status: 400,
                    message: "Invalid UserName or Password",
                    data: null,
                };
            }
            const token = yield JWT.sign({ sub: user._id }, SecretKey, {
                expiresIn: "60000s",
            });
            return {
                status: 200,
                message: "Login Successfully",
                data: token,
            };
        }
        catch (error) {
            return {
                status: 500,
                message: "Invalid Error",
                data: error,
            };
        }
    });
}
exports.UserLogin = UserLogin;
