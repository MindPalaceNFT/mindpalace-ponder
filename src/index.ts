import { ponder } from "@/generated";

let idCounter = 0;
let totalStakers: bigint = BigInt(0);

type StakedArgs = {
  staker: string;
  amount: bigint;
};

ponder.on("Staking:Staked", async ({ event, context }) => {
  const { staker, amount } = event.args as StakedArgs;

  await context.db.User.upsert({
    id: staker,
    create: {
      points: BigInt(0),
      staked: true,
      ethStaked: amount,
    },
    update: {
      ethStaked: amount,
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
  const { staker: unstaker, amount } = event.args as StakedArgs;

  await context.db.User.update({
    id: unstaker,
    data: {
      staked: false,
      ethStaked: BigInt(0),
    },
  });

  await context.db.Stats.update({
    id: 0,
    data: {
      totalStakers: totalStakers--,
    },
  });
});
