import { createConfig } from "@ponder/core";
import { Abi, http, webSocket } from "viem";

import { abi } from "./abis/Staking";

const RPC_URL = process.env.PONDER_RPC_URL_1 || "";

export default createConfig({
  networks: {
    Blast: {
      chainId: 81457,
      transport: webSocket(
        "wss://rpc.ankr.com/blast/ws/e48a473be7cfb8adb30211a6b3fe9635d422bda9d4805df358f68e0959b401ef"
      ),
    },
  },
  contracts: {
    Staking: {
      network: "Blast",
      abi: abi,
      address: "0x3d2F0400BB52798cF016406872b1933eD5d3a90e",
      startBlock: 462863,
    },
  },
});
