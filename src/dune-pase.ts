import * as dotenv from "dotenv";
import { DuneClient } from "@duneanalytics/client-sdk";
dotenv.config();
const apiKey = process.env.DUNE_API_KEY;
const dune = new DuneClient(apiKey as string);

export const fetch_dune = async (queryId: number): Promise<string[]> => {
  const query_result = await dune.getLatestResult({ queryId });
  const result = query_result.result;
  if (!result) {
    return [];
  }
  const list: string[] = result.rows
    .map((item) => {
      if (typeof item.balance === "number" && item.balance >= 0) {
        return item.address as string;
      }
      return undefined;
    })
    .filter((address): address is string => address !== undefined);

  return list;
};

fetch_dune(4008101);
