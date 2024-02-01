const JWT = require("jsonwebtoken");
import { User } from "../schema/UserSchema";
const bcrypt = require("bcrypt");

const SecretKey = "Secret_key";

// async function VerfiyPassword( Password:String , hashpassword:any):Promise<Boolean>{
//     const result =  await bcrypt.compare(Password,hashpassword)
//     return result;
// }

async function UserLogin(model: any) {
  try {
    const { UserName, Password } = model;
    if (!UserName || !Password) {
      return {
        status: 400,
        message: "Bad Request",
        data: null,
      };
    }

    const user = await User.findOne({ firstName: UserName, isActive: true });

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
    const verification = await bcrypt.compare(Password, hashpassword);

    if (verification === false) {
      return {
        status: 400,
        message: "Invalid UserName or Password",
        data: null,
      };
    }

    const token = await JWT.sign({ sub: user._id }, SecretKey, {
      expiresIn: "60000s",
    });

    return {
      status: 200,
      message: "Login Successfully",
      data: token,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: "Invalid Error",
      data: error,
    };
  }
}

export { UserLogin };
