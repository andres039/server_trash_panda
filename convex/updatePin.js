import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { id, field }) => {
  console.log('field', field )

  await db.patch(id, { field } );
});
