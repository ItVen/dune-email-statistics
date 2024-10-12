import * as fs from "fs";
import * as path from "path";
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
