/* eslint-disable */
/**
 * Generated API.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.14.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules } from "convex/api";
import type * as createPin from "../createPin";
import type * as createUser from "../createUser";
import type * as deletePin from "../deletePin";
import type * as getPins from "../getPins";
import type * as getUsers from "../getUsers";
import type * as updatePin from "../updatePin";

/**
 * A type describing your app's public Convex API.
 *
 * This `API` type includes information about the arguments and return
 * types of your app's query and mutation functions.
 *
 * This type should be used with type-parameterized classes like
 * `ConvexReactClient` to create app-specific types.
 */
export type API = ApiFromModules<{
  createPin: typeof createPin;
  createUser: typeof createUser;
  deletePin: typeof deletePin;
  getPins: typeof getPins;
  getUsers: typeof getUsers;
  updatePin: typeof updatePin;
}>;
