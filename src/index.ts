import type { Hex } from "viem";
import { createPublicClient, fromHex, http } from "viem";

import { ponder } from "@/generated";

import { StakingAbi } from "../abis/Staking";
import { mainnet } from "viem/chains";

let idCounter = 0;
let totalStakers: bigint = BigInt(0);
const address = "0x3d2F0400BB52798cF016406872b1933eD5d3a90e";

ponder.on("Staking:Staked", async ({ event, context }) => {
  const { staker } = event.args;

  await context.db.User.create({
    id: staker,
    data: {
      points: BigInt(0),
      staked: true,
    },
  });

  await context.db.Stats.upsert({
    id: 0,
    create: {
      totalStakers: totalStakers++,
      merkleRoot: "0x0",
    },
    update: {
      totalStakers: totalStakers++,
    },
  });
});

ponder.on("Staking:Unstaked", async ({ event, context }) => {
  const { staker: unstaker } = event.args;

  await context.db.User.update({
    id: unstaker,
    data: {
      staked: false,
    },
  });

  await context.db.Stats.update({
    id: 0,
    data: {
      totalStakers: totalStakers--,
    },
  });
});

ponder.on("Staking:MerkleRootUpdated", async ({ event, context }) => {
  const { merkleRoot } = event.args;

  await context.db.Stats.update({
    id: 0,
    data: {
      merkleRoot: merkleRoot,
    },
  });
});
