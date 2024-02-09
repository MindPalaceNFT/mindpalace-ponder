import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  User: p.createTable({
    id: p.string(), // Add the missing 'id' property
    points: p.bigint(),
    staked: p.boolean(),
  }),
  Stats: p.createTable({
    id: p.int(),
    totalStakers: p.bigint(),
    merkleRoot: p.string(),
  }),
}));
