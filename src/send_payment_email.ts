import { sendEmail } from "./send-email";
import { readCsvFile } from "./tool";

const sendPaymentEmail = async (filePath: string) => {
  const csvData = await readCsvFile(filePath);
  const emails = csvData.map((item) => {
    return { email: item.email };
  });
  await sendEmail(emails);
};

sendPaymentEmail("./csv/payment_address_email.csv");
