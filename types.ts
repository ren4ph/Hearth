import { Member, Profile } from "@prisma/client"
import { Server } from "http"

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[]
}
