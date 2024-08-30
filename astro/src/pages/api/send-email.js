// /src/pages/api/send-email.js
import { getSession } from "next-auth/react";
import nodemailer from 'nodemailer';

export const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, {
      Location: '/api/auth/signin/github',
    });
    res.end();
    return;
  }

  const { website, reason } = req.body;

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  let mailOptions = {
    from: `"${session.user.name}" <help@wilkin.xyz>`,
    to: process.env.HELPDESK,
    subject: `Request to unblock: ${website}`,
    text: `Dear IT Helpdesk,\n\nI would like to request the unblocking of the following website:\n\nWebsite: ${website}\n\nReason: ${reason}\n\nThank you,\n${session.user.name}\nEmail: ${session.user.email}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: 'Error sending email' });
  }
};
