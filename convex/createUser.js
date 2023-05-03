import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { email, username, password }) => {
  await db.insert("users", { email, username, password });
  // ...
});
