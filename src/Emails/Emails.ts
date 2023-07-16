import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import { google } from "googleapis";

const GOOGLE_ID =
  "607063325888-5r9ma23i481qd1tk065dlgf9pofascfi.apps.googleusercontent.com";

const GOOGLE_SECRET = "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";

const GOOGLE_REFRESHTOKEN =
  "1//04k_z9ebpngq-CgYIARAAGAQSNwF-L9Ir0IlTnY6iVtGwKhCyOuFixABn1LPLxlyYot70MYSTKHyO7ad7p2hJVYM0aIHWO-SDI6M";

const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

// The frontend url for the verified page(substitute the url here)
const Verification_URL = "https://pakam.ng/verified";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);

oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

// Verify user email for pakam interview test:
export const VerifyUsers = async (user: any) => {
  try {
    const GetUserAccessToken: any = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "nicsylvia15f@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESHTOKEN,
        accessToken: GetUserAccessToken.token,
      },
    });

    // Connecting ejs file:
    const EmailVerifyEjs = path.join(
      __dirname,
      "../../views/AccountVerification.ejs"
    );

    // To render file:
    const Renderemailfile = await ejs.renderFile(EmailVerifyEjs, {
      name: user?.name,
      email: user?.email,
      userId: user?._id,
      userToken: user?.token,
      url: `${Verification_URL}/${user?._id}/${user?.token}`,
    });

    const Mailer = {
      from: "Sylvia Pakam ♻ <nicsylvia15f@gmail.com>",
      to: user?.email,
      subject: "Account Verification",
      html: Renderemailfile,
    };

    transporter
      .sendMail(Mailer)
      .then(() => {
        console.log("Verification email sent");
      })
      .catch((err) => {
        console.log("An error occured, please try again");
      });
  } catch (error) {
    console.log("An error occured in sending email", error);
  }
};

// Email for the insufficient funds:
export const InsufficientFunds = async (user: any) => {
  try {
    const GetUserAccessToken: any = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: "nicsylvia15f@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESHTOKEN,
        accessToken: GetUserAccessToken.token,
      },
    });

    // Connecting ejs file:
    const InsufficientEjs = path.join(
      __dirname,
      "../../views/InsufficientFunds.ejs"
    );

    // To render file:
    const Renderfundsfile = await ejs.renderFile(InsufficientEjs, {
      username: user?.name,
      email: user?.email,
      userId: user?._id,
      userAccNumber: user?.accountNumber,
      TransferAmount: user?.amount,
      userBalance: user?.wallet?.Balance,
      TransferDate: user?.wallet?.Date,
    });

    const Mailer = {
      from: "Sylvia Pakam ♻ <nicsylvia15f@gmail.com>",
      to: user?.email,
      subject: "Insufficient Funds",
      html: Renderfundsfile,
    };

    transporter
      .sendMail(Mailer)
      .then(() => {
        console.log("Insufficient email sent");
      })
      .catch((err) => {
        console.log("An error occured, please try again");
      });
  } catch (error) {
    console.log("An error occured in sending insufficient funds email", error);
  }
};
