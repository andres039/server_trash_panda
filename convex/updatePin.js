import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { id, tag }) => {
  await db.patch(id, { tag });
});
