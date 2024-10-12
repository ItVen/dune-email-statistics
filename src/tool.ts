import * as fs from "fs";
import * as path from "path";
import csv from "csv-parser";
interface CsvRow {
  [key: string]: string;
}

export interface EmailInfo {
  email: string;
}

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

export const writeSQLToFile = async (filePath: string, sql: string) => {
  ensureDirectoryExistence(filePath);

  try {
    await fs.promises.writeFile(filePath, sql);
    console.log(`SQL save success! ${filePath}`);
  } catch (err) {
    console.error("write file error:", err);
  }
};

export const readCsvFile = (filePath: string): Promise<CsvRow[]> => {
  ensureDirectoryExistence(filePath);
  return new Promise((resolve, reject) => {
    const results: CsvRow[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: CsvRow) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};
