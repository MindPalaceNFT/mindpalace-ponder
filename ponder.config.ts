import { createConfig } from "@ponder/core";
import { Abi, http } from "viem";

import { abi } from "./abis/Staking";

export default createConfig({
  networks: {
    blast: {
      chainId: 1,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts: {
    Staking: {
      network: "blast",
      abi: abi as Abi,
      address: "0x3d2F0400BB52798cF016406872b1933eD5d3a90e",
      startBlock: 19105343,
    },
  },
});
