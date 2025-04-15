import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const currentProfile = async () => {
  const user = await currentUser();

  if (!user.id) {
    return null;
  }

  const userId = user.id

  const profile = await db.profile.findUnique({
    where: {
      userId
    }
  })

  return profile
}
