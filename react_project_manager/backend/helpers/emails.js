import nodemailer from "nodemailer";

const emailRegister = async (data) => {
  const { email, name, token } = data;
  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const info = await transport.sendMail({
    from: '"Uptask - Project Manager System" <accounts@uptask.com',
    to: email,
    subject: "Uptask - Confirm your account",
    text: "Confirm your account in UpTask",
    html: `
    <p> Hello ${name}. Check your account in Uptask</p>
    <p>Your account is almost ready; you just need to check your email by following the link below: </p>
    <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Check your account!</a>
    <p>If you did not create this account, you can ignore this message. Unconfirmed accounts in our system have a lifespan of one week before being removed.</p>
    `,
  });
};

const recoverPasswordEmail = async (data) => {
  const { email, name, token } = data;
  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const info = await transport.sendMail({
    from: '"Uptask - Project Manager System" <accounts@uptask.com',
    to: email,
    subject: "Uptask - Reset your password",
    text: "Reset your password in UpTask",
    html: `
    <p> Hello ${name}. Reset your password in Uptask</p>
    <p>Your account is almost ready; you just need to check your email by following the link below: </p>
    <a href="${process.env.FRONTEND_URL}/new-password/${token}">Reset your password!</a>
    <p>If you did not create this account, you can ignore this message. Unconfirmed accounts in our system have a lifespan of one week before being removed.</p>
    `,
  });
};

export { emailRegister, recoverPasswordEmail };
