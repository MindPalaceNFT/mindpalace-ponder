import { createConfig } from "@ponder/core";
import { http } from "viem";

import { StakingAbi } from "./abis/Staking";

export default createConfig({
  networks: {
    blast: {
      chainId: 81457,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts: {
    Staking: {
      network: "blast",
      abi: StakingAbi,
      address: "0x3d2F0400BB52798cF016406872b1933eD5d3a90e",
      startBlock: 19105343,
    },
  },
});
