import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { id }) => {
  return await db.delete(id);
});
