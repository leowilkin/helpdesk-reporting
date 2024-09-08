const nodemailer = require('nodemailer');

export default async function (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests are allowed' });
    }

    const { name, website, reason } = req.body;

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    // Set up the email data
    let mailOptions = {
        from: '"Website Unblock Request" <EMAIL FROM ADDRESS>', // Replace with your email
        to: process.env.HELPDESK,
        subject: "Request to Unblock Website",
        text: `Dear IT Helpdesk,\n\nI would like to request the unblocking of the following website:\n\nWebsite: ${website}\n\nReason: ${reason}\n\nThank you,\n${name}`
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        return res.status(200).send('Request submitted successfully');
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).send('Error sending email');
    }
}
