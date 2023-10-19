import nodemailer from "nodemailer";

export const sendEmail = async (contentEmail) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail(contentEmail);
    console.log(`Email terkirim: ${info}`);
  } catch (error) {
    console.error(`Terjadi kesalahan saat mengirim email: ${error}`);
  }
};
