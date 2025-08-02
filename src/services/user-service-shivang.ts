import { User } from "../db/models/user-model";

export async function getUserIdsByRoleAndDomain(payload: any) {
  const { domain, bap_id, bpp_id } = payload.context;
  const users = await User.find({
    domain,
    $or: [
      { role: "BAP", subscriber_id: bap_id },
      { role: "BPP", subscriber_id: bpp_id },
    ],
  });

  let bap_user_id: string | undefined;
  let bpp_user_id: string | undefined;

  for (const user of users) {
    if (user.role === "BAP" && user.subscriber_id === bap_id) {
      bap_user_id = user._id.toString();
    } else if (user.role === "BPP" && user.subscriber_id === bpp_id) {
      bpp_user_id = user._id.toString();
    }
  }
  return { bap_user_id, bpp_user_id };
}
