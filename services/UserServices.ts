import { Request } from "express";
import JWT from "jsonwebtoken";
import * as DBservices from "../util/File";
import { fullname } from "../util/helper";
import * as ISchema from "../models/Typeshema";

const SecretKey = "Secret_key";

async function GetEducationAccount(
  req: Request
): Promise<ISchema.Apiresponse<ISchema.Igeteducationacc>> {
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
    const decode = await JWT.verify(Token, SecretKey);
    const userid = decode.sub;

    if (!decode || !decode.sub) {
      return {
        status: 401,
        msg: "Unauthorized request",
        data: null,
      };
    }
    const user = await DBservices.User.findOne({ _id: userid });
    if (user === null) {
      return {
        status: 401,
        msg: "User does not exist",
        data: null,
      };
    }

    const Fullname = await fullname(user.firstName, user.lastName);

    let lastAccount: any = await DBservices.LastEdAccount.findOne({
      userId: userid,
    });
    if (!lastAccount) {
      return {
        status: 404,
        msg: "No Education Account",
        data: null,
      };
    }

    let Data: ISchema.Igeteducationacc = {
      userName: null,
      fullName: null,
      accountType: null,
      accountId: null,
      profileImage: null,
    };

    const EducationAcc: any = await DBservices.Education.findOne({
      _id: lastAccount.edAccountId,
    });
    Data.userName = EducationAcc.userName;
    Data.accountType = EducationAcc.eduactionModel;
    Data.fullName = Fullname;
    if (EducationAcc.isEmployee) {
      const data = await DBservices.EdEmployee.findOne({ userId: userid });
      if (!data) {
        return {
          status: 404,
          msg: "Employee Account doesn't exist",
          data: null,
        };
      }
      Data.profileImage = data.baseURL + data.path;
      Data.accountId = data._id;
    }

    if (EducationAcc.isClient) {
      const data = await DBservices.EdClient.findOne({ userId: userid });
      if (!data) {
        return {
          status: 204,
          msg: "Client Account doesn't exist",
          data: null,
        };
      }
      Data.profileImage = data.baseURL + data.path;
      Data.accountId = data._id;
    }

    if (EducationAcc.isCompany) {
      const data = await DBservices.EdCompany.findOne({ userId: userid });
      if (!data) {
        return {
          status: 404,
          msg: "Company Account doesn't exist",
          data: null,
        };
      }
      Data.profileImage = data.companyLogoBaseURL + data.companyLogoPath;
      Data.accountId = data._id;
    }

    if (EducationAcc.isFreelancer) {
      const data = await DBservices.EdFreelancer.findOne({
        userId: userid,
      });
      if (!data) {
        return {
          status: 404,
          msg: "Freelancer Account doesn't exist",
          data: null,
        };
      }
      Data.profileImage = data.baseURL + data.path;
      Data.accountId = data._id;
    }

    return {
      status: 200,
      msg: "SUCCESS",
      data: Data,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: 500,
      msg: "Internal Server Error",
      data: null,
    };
  }
}

async function AddEdEmployee(req: Request, model: any) {
  const Authheader = req.headers["authorization"];
  const Token = Authheader && Authheader.split(" ")[1];

  if (!Token) {
    return {
      status: 401,
      msg: "Unauthorized Request",
      data: null,
    };
  }

  const {
    firstName,
    lastName,
    location,
    jobTitle,
    company,
    industry,
    skills,
    educationDegree,
    educationInstitution,
    educationGradYear,
    microbloggingBio,
    shortVidUsername,
    about,
  } = model;

  if (
    !firstName ||
    !lastName ||
    !location ||
    !jobTitle ||
    !company ||
    !industry ||
    !skills ||
    !educationDegree ||
    !educationInstitution ||
    !educationGradYear
  ) {
    return {
      status: 400,
      msg: "Incomplete Details",
      data: null,
    };
  }

  try {
    const decode = await JWT.verify(Token, SecretKey);
    const userid = decode.sub;

    if (!decode || !decode.sub) {
      return {
        status: 401,
        msg: "Unauthorized request",
        data: null,
      };
    }
    const user = await DBservices.User.findOne({
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

    const Fullname = fullname(firstName, lastName);

    let baseUrl = " sdc/";
    let path = " cds";

    const employee: ISchema.IEdEmployee = await DBservices.EdEmployee.create({
      userId: user._id,
      firstName: firstName,
      lastName: lastName,
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

    const education: DBservices.IEducation = await DBservices.Education.create({
      userId: userid,
      userName: await Fullname,
      isEmployee: true,
      eduactionModel: "Employee",
      edAccountId: employee._id,
      MicrobloggingBio: microbloggingBio,
      ShortVidUsername: shortVidUsername,
    });

    const Addmicroblogging: ISchema.IMicroblogging =
      await DBservices.Microblogging.create({
        userId: userid,
        firstName: firstName,
        lastName: lastName,
        baseURL: baseUrl,
        path: path,
        userName: await Fullname,
        microId: education._id,
        microModel: "Education",
      });

    const Addshortvid: ISchema.IShortVideo = await DBservices.ShortVideo.create(
      {
        userId: userid,
        fullName: await Fullname,
        userName: shortVidUsername,
        shortId: education._id,
        shortModel: "Education",
        baseURL: baseUrl,
        path: path,
      }
    );

    let lastAccount: any = await DBservices.LastEdAccount.findOne({
      userId: userid,
    });

    if (!lastAccount) {
      lastAccount = new DBservices.LastEdAccount();
    }
    lastAccount.userId = userid;
    lastAccount.edAccountId = education._id;
    await lastAccount.save();

    return {
      status: 200,
      msg: "SUCCESS",
      data: "Account Created",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Invalid Error",
      data: null,
    };
  }
}

async function AddEdCompany(req: Request, model: any) {
  const Authheader = req.headers["authorization"];
  const Token = Authheader && Authheader.split(" ")[1];

  if (!Token) {
    return {
      status: 401,
      msg: "Unauthorized Request",
      data: null,
    };
  }

  const {
    companyName,
    typeOfBusiness,
    industrySector,
    companySize,
    location,
    websiteURL,
    microbloggingBio,
    shortVidUsername,
    about,
  } = model;

  if (
    !companyName ||
    !typeOfBusiness ||
    !industrySector ||
    !companySize ||
    !location ||
    !websiteURL ||
    !about
  ) {
    return {
      status: 400,
      msg: "Incomplete Details",
      data: null,
    };
  }

  try {
    const decode = await JWT.verify(Token, SecretKey);
    const userid = decode.sub;

    if (!decode || !decode.sub) {
      return {
        status: 401,
        msg: "Unauthorized request",
        data: null,
      };
    }
    const user = await DBservices.User.findOne({
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

    const checkcompany = await DBservices.EdCompany.findOne({
      companyName: companyName,
      industrySector: industrySector,
    });
    if (checkcompany != null) {
      return {
        status: 409,
        msg: "Company already exist",
        data: null,
      };
    }
    const Fullname = await fullname(user.firstName, user.lastName);

    let baseUrl = " ";
    let path = " ";

    const company: ISchema.IEdCompany = await DBservices.EdCompany.create({
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

    const education: DBservices.IEducation = await DBservices.Education.create({
      userId: userid,
      userName: Fullname,
      isCompany: true,
      edAccountId: company._id,
      eduactionModel: "Company",
      MicrobloggingBio: microbloggingBio,
      ShortVidUsername: shortVidUsername,
    });

    const Addmicroblogging: ISchema.IMicroblogging =
      await DBservices.Microblogging.create({
        userId: userid,
        userName: companyName,
        firstName: user.firstName,
        lastName: user.lastName,
        baseURL: baseUrl,
        path: path,
        microId: education._id,
        microModel: "Education",
      });

    const Addshortvid: ISchema.IShortVideo = await DBservices.ShortVideo.create(
      {
        userId: userid,
        fullName: companyName,
        userName: shortVidUsername,
        shortId: education._id,
        shortModel: "Education",
        baseURL: baseUrl,
        path: path,
      }
    );

    let lastAccount: any = await DBservices.LastEdAccount.findOne({
      userId: userid,
    });

    if (!lastAccount) {
      lastAccount = new DBservices.LastEdAccount();
    }
    lastAccount.userId = userid;
    lastAccount.edAccountId = education._id;
    await lastAccount.save();

    return {
      status: 200,
      msg: "SUCCESS",
      data: "Education Company Account Created",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Invalid Error",
      data: null,
    };
  }
}

export { GetEducationAccount, AddEdEmployee, AddEdCompany };
