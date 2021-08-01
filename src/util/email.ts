import * as nodemailer from "nodemailer";
import { generateToken } from "./token";

const transpoter: nodemailer.Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID as string,
    pass: process.env.MAIL_PW as string,
  },
});

export const sendAuthMessage: Function = async (arg: {
  receiver: string;
  nickname: string;
}) => {
  const jwt = generateToken(
    { email: arg.receiver, nickname: arg.nickname },
    "5m"
  );
  const mailOptions: nodemailer.SendMailOptions = {
    from: `GRIG CA ${process.env.MAIL_ID as string}`,
    to: arg.receiver,
    subject: "GRIG 이메일 인증 메일입니다.",
    html: `<b>안녕하세요 ${arg.nickname}님, GRIG 인증 메일입니다.<b></br>
    <b> 아래 링크에 접속하여 인증절차를 마쳐주시길 바랍니다. <b></br>
    <b> 만약 수신자님이 아니시라면, 해당 메일은 무시하시고 삭제해주시길 바랍니다.<b></br>
    <h2>${process.env.baseURL}/email/${jwt}`,
  };

  try {
    await transpoter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
  }
};
