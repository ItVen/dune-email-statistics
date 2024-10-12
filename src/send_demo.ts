import { sendEmail } from "./send-email";
import { readCsvFile } from "./tool";

const sendDemoEmail = async (filePath: string) => {
  const csvData = await readCsvFile(filePath);
  const emails = csvData.map((item) => {
    return { email: item.email };
  });
  await sendEmail(emails);
};

sendDemoEmail("./csv/demo.csv");
