import { createConfig } from "@ponder/core";
import { http } from "viem";

import { StakingAbi } from "./abis/Staking";

export default createConfig({
  networks: {
    mainnet: {
      chainId: 1,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts: {
    Staking: {
      network: "mainnet",
      abi: StakingAbi,
      address: "0xB6CE133dF3528620B02160D7D07E082F3453D3EB",
      startBlock: 19105343,
    },
  },
});
