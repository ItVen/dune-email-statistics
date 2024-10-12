import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import { EmailInfo } from "./tool";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendEmail = async (recipients: EmailInfo[]) => {
  const personalizations = recipients.map((recipient) => ({
    to: [{ email: recipient.email }],
  }));

  const msg = {
    personalizations: personalizations,
    from: {
      email: process.env.SENDGRID_EMAIL as string,
    },
    subject: "Bulk Email with SendGrid", //TODO email template
    text: "This is a bulk email sent using SendGrid.", //TODO email template
    html: "<strong>This is a bulk email sent using SendGrid!</strong>", //TODO email template
  };
  try {
    await sgMail.send(msg);
    console.log("Bulk email sent successfully!");
  } catch (error) {
    console.error("Error sending bulk email:", error);
  }
};
