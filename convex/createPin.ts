import { mutation } from "./_generated/server";

export default mutation(
  async (
    { db },
    {
      title,
      description,
      picture,
      condition,
      latitude,
      longitude,
      date,
      creator_id,
      claimer_id,
    }
  ) => {
    await db.insert("pins", {  title,
      description,
      picture,
      condition,
      latitude,
      longitude,
      date,
      creator_id,
      claimer_id, });
    // ...
  }
);
