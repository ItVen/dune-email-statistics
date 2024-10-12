import { sendEmail } from "./send-email";
import { readCsvFile } from "./tool";

const sendWalletEmail = async (filePath: string) => {
  const csvData = await readCsvFile(filePath);
  const emails = csvData.map((item) => {
    return { email: item.email };
  });
  await sendEmail(emails);
};

sendWalletEmail("./csv/wallet_address_email.csv");
