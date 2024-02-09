import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  User: p.createTable({
    id: p.int(), // Add the missing 'id' property
    address: p.string(),
    points: p.bigint(),
  }),
  Stats: p.createTable({
    id: p.int(),
    totalStakers: p.bigint(),
  }),
}));
