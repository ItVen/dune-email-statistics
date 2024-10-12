import { fetch_dune } from "./dune-pase";
import { writeSQLToFile } from "./tool";

let duneIds = [
  4008101, 4095916, 4095881, 4036298, 4096321, 4096350, 4096592, 4096772,
  4096778, 4096781, 4096782, 4096785, 4036317, 4146583, 4036387, 4036395,
  4146624, 4146635, 4146645, 4036388, 4036397, 4146547, 4146549,
];

const walletAddress = async () => {
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
  await writeSQLToFile("./sql/wallet_address.sql", sql);
};

//Mainnet-Wallet-Backend
walletAddress();
