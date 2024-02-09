import type { Hex } from "viem";
import { createPublicClient, fromHex, http } from "viem";

import { ponder } from "@/generated";

import { StakingAbi } from "../abis/Staking";
import { mainnet } from "viem/chains";

let idCounter = 0;
let totalStakers: bigint = BigInt(0);
const address = "0xB6CE133dF3528620B02160D7D07E082F3453D3EB";

const viem = createPublicClient({
  chain: mainnet,
  transport: http(process.env.PONDER_RPC_URL_1),
});

ponder.on("Staking:Staked", async ({ event, context }) => {
  const { staker } = event.args;
  const { client } = context;

  await context.db.User.create({
    id: idCounter++,
    data: {
      address: staker,
      points: BigInt(0),
    },
  });
});
