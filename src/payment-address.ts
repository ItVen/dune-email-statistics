import { fetch_dune } from "./dune-pase";
import { writeSQLToFile } from "./tool";

let duneIds = [4105388, 4036665, 4037076, 4036992, 4037097];

const paymentAddress = async () => {
  let addressList = await Promise.all(duneIds.map((id) => fetch_dune(id)));
  const addresses = Array.from(new Set(addressList.flat()));
  const formattedAddresses = addresses
    .map((address) => `x'${address.replace("0x", "")}'`)
    .join(",");

  const sql = `
select
  CONCAT('0x', hex(address)) as address,
  email
from
  accounts
where
  address IN(${formattedAddresses})
  `;
  await writeSQLToFile("./sql/payment_address.sql", sql);
};

//Mainnet-Wallet-Backend
paymentAddress();
